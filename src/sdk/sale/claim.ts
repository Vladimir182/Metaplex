import {
  MarketArgs,
  createClaimResourceInstruction,
  SellingResourceArgs,
  findVaultOwnerAddress,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { errorFromCode } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/generated/errors";
import { Wallet } from "@metaplex/js";
import {
  Connection,
  PublicKey,
  Transaction,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { createAndSignTransaction } from "sdk/createAndSignTransaction";
import { getErrorForTransaction } from "../getErrorForTransaction";

export interface ClaimProps {
  connection: Connection;
  wallet: Wallet;
  metadata: PublicKey;
  store: PublicKey;
  market: PublicKey;
  marketData: MarketArgs;
  sellingResourceData: SellingResourceArgs;
}

const createTransaction = async ({
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

export const claim = async ({
  connection,
  wallet,
  ...rest
}: ClaimProps): Promise<void> => {
  const claimTx = await createTransaction({
    connection,
    wallet,
    ...rest,
  });
  const signedTx = await wallet.signTransaction(claimTx);

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
