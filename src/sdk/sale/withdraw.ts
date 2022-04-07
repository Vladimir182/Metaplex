import {
  findPayoutTicketAddress,
  createWithdrawInstruction,
  Creator,
  MarketArgs,
  findTreasuryOwnerAddress,
  findPrimaryMetadataCreatorsAddress,
  PrimaryMetadataCreators,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { errorFromCode } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/generated/errors";
import { Wallet } from "@metaplex/js";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { getErrorForTransaction } from "../getErrorForTransaction";
import { createAndSignTransaction } from "sdk/createAndSignTransaction";
import { IArt } from "state/artworks";
import { createPrimaryMetadataCreatorsTransaction } from "../createPrimaryMetadataCreatorsTransaction";

export interface WithdrawProps {
  connection: Connection;
  wallet: Wallet;
  metadata: PublicKey;
  market: PublicKey;
  marketData: MarketArgs;
  artwork: IArt;
}

const createTransaction = async ({
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
          primaryMetadataCreators,
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

export const withdraw = async ({
  connection,
  wallet,
  ...rest
}: WithdrawProps): Promise<void> => {
  const withdrawTx = await createTransaction({
    connection,
    wallet,
    ...rest,
  });
  const signedTx = await wallet.signTransaction(withdrawTx);

  const txId = await connection.sendRawTransaction(signedTx.serialize(), {
    skipPreflight: true,
  });

  // Force wait for max confirmations
  await connection.confirmTransaction(txId, "max");

  const [error] = await getErrorForTransaction(connection, txId);

  if (error) {
    const codeError = errorFromCode(parseInt(error, 16));
    throw new Error(codeError?.message || `Raw transaction ${txId} failed`);
  }
};

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
