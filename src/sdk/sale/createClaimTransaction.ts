import {
  Connection,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Wallet } from "@metaplex/js";
import {
  createClaimResourceInstruction,
  findVaultOwnerAddress,
  MarketArgs,
  SellingResourceArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";
import { createAndSignTransaction } from "../createAndSignTransaction";

interface ClaimProps {
  connection: Connection;
  wallet: Wallet;
  metadata: PublicKey;
  store: PublicKey;
  market: PublicKey;
  marketData: MarketArgs;
  sellingResourceData: SellingResourceArgs;
}

export const createClaimTransaction = async ({
  connection,
  wallet,
  metadata,
  store,
  market,
  marketData,
  sellingResourceData,
}: ClaimProps): Promise<Transaction> => {
  const { treasuryHolder, sellingResource } = marketData;
  const { vault, resource } = sellingResourceData;

  const [vaultOwner, vaultOwnerBump] = await findVaultOwnerAddress(
    resource,
    store
  );

  const claimToken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    resource,
    wallet.publicKey
  );

  const instruction = createClaimResourceInstruction(
    {
      market,
      treasuryHolder,
      sellingResource,
      sellingResourceOwner: wallet.publicKey,
      vault,
      metadata,
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
