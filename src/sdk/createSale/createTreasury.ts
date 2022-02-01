import { findTresuryOwnerAddress } from "@metaplex-foundation/mpl-membership-token";
import { Wallet } from "@metaplex/js";
import { NATIVE_MINT } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";

import { createTokenAccount } from "../createTokenAccount";

export interface CreateTreasuryProps {
  connection: Connection;
  wallet: Wallet;
  sellingResource: PublicKey;
}

export const createTreasury = async ({
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
  const [treasuryOwner, treasuryOwnerBump] = await findTresuryOwnerAddress(
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