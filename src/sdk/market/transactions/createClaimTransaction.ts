import { Wallet } from "@metaplex/js";
import {
  createClaimResourceInstruction,
  findVaultOwnerAddress,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { createAndSignTransaction } from "sdk/transactions/createAndSignTransaction";
import { IFixedPrice } from "state/sales";
import { toPubkey } from "utils/toPubkey";

interface ClaimProps {
  connection: Connection;
  wallet: Wallet;
  store: PublicKey;
  sale: IFixedPrice;
}

export const createClaimTransaction = async ({
  connection,
  wallet,
  store,
  sale,
}: ClaimProps): Promise<Transaction> => {
  const { treasuryHolder, sellingResource, vault, resource } = sale.refs;

  const [vaultOwner, vaultOwnerBump] = await findVaultOwnerAddress(
    toPubkey(resource),
    store
  );

  const claimToken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    toPubkey(resource),
    wallet.publicKey
  );

  const instruction = createClaimResourceInstruction(
    {
      market: toPubkey(sale.id),
      treasuryHolder: toPubkey(treasuryHolder),
      sellingResource: toPubkey(sellingResource),
      sellingResourceOwner: wallet.publicKey,
      vault: toPubkey(vault),
      metadata: toPubkey(sale.artwork.accountAddress),
      owner: vaultOwner,
      destination: claimToken,
      tokenMetadataProgram: MetadataProgram.PUBKEY,
      clock: SYSVAR_CLOCK_PUBKEY,
    },
    {
      vaultOwnerBump,
    }
  );

  return createAndSignTransaction([instruction], connection, wallet, []);
};
