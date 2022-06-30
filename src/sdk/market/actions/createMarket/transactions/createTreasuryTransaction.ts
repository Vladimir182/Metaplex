import { findTreasuryOwnerAddress } from "@metaplex-foundation/mpl-fixed-price-sale";
import { NATIVE_MINT } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { createTokenAccount } from "sdk/createTokenAccount";
import { Wallet } from "wallet";

export interface CreateTreasuryProps {
  connection: Connection;
  wallet: Wallet;
  sellingResource: PublicKey;
}

export const createTreasuryTransaction = async ({
  sellingResource,
  connection,
  wallet,
}: CreateTreasuryProps): Promise<{
  treasuryOwnerBump: number;
  treasuryHolder: Keypair;
  treasuryOwner: PublicKey;
  treasuryMint: PublicKey;
  createTreasuryInstructions: TransactionInstruction[];
  createTreasurySigners: Keypair[];
}> => {
  const treasuryMint = new PublicKey(NATIVE_MINT);
  const [treasuryOwner, treasuryOwnerBump] = await findTreasuryOwnerAddress(
    treasuryMint,
    sellingResource
  );
  const {
    tokenAccount: treasuryHolder,
    instructions: createTreasuryInstructions,
  } = await createTokenAccount({
    payer: wallet.publicKey,
    connection,
    mint: treasuryMint,
    owner: treasuryOwner,
  });

  return {
    treasuryOwnerBump,
    treasuryHolder,
    treasuryOwner,
    treasuryMint,
    createTreasuryInstructions,
    createTreasurySigners: [treasuryHolder],
  };
};
