import {
  Connection,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Wallet } from "@metaplex/js";
import {
  createWithdrawInstruction,
  Creator,
  findPayoutTicketAddress,
  findPrimaryMetadataCreatorsAddress,
  findTreasuryOwnerAddress,
  MarketArgs,
  PrimaryMetadataCreators,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { IArt } from "state/artworks";
import { createPrimaryMetadataCreatorsTransaction } from "../createPrimaryMetadataCreatorsTransaction";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { createAndSignTransaction } from "../createAndSignTransaction";

interface WithdrawProps {
  connection: Connection;
  wallet: Wallet;
  metadata: PublicKey;
  market: PublicKey;
  marketData: MarketArgs;
  artwork: IArt;
}
const getCreators = async (
  connection: Connection,
  primaryMetadataCreators: PublicKey
): Promise<Creator[]> => {
  const primaryCreatorsAccountInfo = await connection.getAccountInfo(
    primaryMetadataCreators
  );

  if (primaryCreatorsAccountInfo) {
    const [{ creators }] = PrimaryMetadataCreators.fromAccountInfo(
      primaryCreatorsAccountInfo
    );

    return creators;
  }

  return [];
};

export const createWithdrawTransaction = async ({
  connection,
  wallet,
  metadata,
  market,
  marketData,
  artwork,
}: WithdrawProps): Promise<Transaction> => {
  const instructions: TransactionInstruction[] = [];
  const [primaryMetadataCreators] = await findPrimaryMetadataCreatorsAddress(
    metadata
  );

  const { treasuryMint, treasuryHolder, sellingResource } = marketData;
  const [treasuryOwner, treasuryOwnerBump] = await findTreasuryOwnerAddress(
    treasuryMint,
    sellingResource
  );

  let creators = await getCreators(connection, primaryMetadataCreators);

  if (!creators.length && !artwork.primarySaleHappened) {
    creators = artwork.creators.map((creator) => ({
      ...creator,
      address: new PublicKey(creator.address),
    }));

    const { createPrimaryMetadataCreatorsTx } =
      await createPrimaryMetadataCreatorsTransaction({
        wallet,
        connection,
        metadata,
        creators,
      });

    instructions.push(...createPrimaryMetadataCreatorsTx.instructions);
  }

  const withdrawInstructions = await Promise.all(
    creators.map(async (creator) => {
      const [payoutTicket, payoutTicketBump] = await findPayoutTicketAddress(
        market,
        creator.address
      );

      const destination = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        treasuryMint,
        creator.address
      );

      return createWithdrawInstruction(
        {
          market,
          sellingResource,
          metadata,
          treasuryHolder,
          treasuryMint,
          owner: treasuryOwner,
          destination,
          funder: creator.address,
          payer: wallet.publicKey,
          payoutTicket,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          primaryMetadataCreators: [primaryMetadataCreators],
          clock: SYSVAR_CLOCK_PUBKEY,
        },
        {
          treasuryOwnerBump,
          payoutTicketBump,
        }
      );
    })
  );
  instructions.push(...withdrawInstructions);

  return createAndSignTransaction(instructions, connection, wallet, []);
};
