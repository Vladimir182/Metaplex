import { MetadataJsonCreator } from "@metaplex/js";
import {
  createWithdrawInstruction,
  findPayoutTicketAddress,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { IFixedPrice } from "state/sales";
import { toPubkey } from "utils/toPubkey";
import { Wallet } from "wallet";

interface CreateCreatorWithdrawInstructionParams {
  creator: MetadataJsonCreator;
  sale: IFixedPrice;
  wallet: Wallet;
  treasuryOwner: PublicKey;
  treasuryOwnerBump: number;
  primaryMetadataCreators: PublicKey;
}

export const createCreatorWithdraw = async ({
  creator,
  sale,
  wallet,
  treasuryOwner,
  treasuryOwnerBump,
  primaryMetadataCreators,
}: CreateCreatorWithdrawInstructionParams) => {
  const { id, artwork } = sale;
  const { treasuryMint, treasuryHolder, sellingResource } = sale.refs;

  const [payoutTicket, payoutTicketBump] = await findPayoutTicketAddress(
    toPubkey(id),
    toPubkey(creator.address)
  );

  const destination = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    toPubkey(treasuryMint),
    toPubkey(creator.address)
  );

  return createWithdrawInstruction(
    {
      market: toPubkey(id),
      sellingResource: toPubkey(sellingResource),
      metadata: toPubkey(artwork.accountAddress),
      treasuryHolder: toPubkey(treasuryHolder),
      treasuryMint: toPubkey(treasuryMint),
      owner: treasuryOwner,
      destination,
      funder: toPubkey(creator.address),
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
};
