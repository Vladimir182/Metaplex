import { PROGRAM_ID } from "@metaplex-foundation/mpl-membership-token";
import { Wallet } from "@metaplex/js";
import { NATIVE_MINT } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";

import { createTokenAccount } from "./createTokenAccount";

export interface CreateTreasuryProps {
  connection: Connection;
  wallet: Wallet;
  sellingResource: PublicKey;
}

const TREASURY_OWNER_PREFIX = "holder";

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

const findTreasuryOwnerAddress = (
  treasuryMint: PublicKey,
  sellingResource: PublicKey
) => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(TREASURY_OWNER_PREFIX),
      treasuryMint.toBuffer(),
      sellingResource.toBuffer(),
    ],
    new PublicKey(PROGRAM_ID)
  );
};
