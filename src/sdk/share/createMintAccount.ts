import {
  createInitializeMintInstruction,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { TransactionsBatch } from "sdk/transactions/TransactionsBatch";

export const createMintAccount = async ({
  payer,
  connection,
  decimals,
  owner,
  freezeAuthority,
}: {
  payer: PublicKey;
  connection: Connection;
  decimals?: number;
  owner?: PublicKey;
  freezeAuthority?: PublicKey;
}) => {
  const mint = Keypair.generate();

  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span
  );

  const createIx = SystemProgram.createAccount({
    fromPubkey: payer,
    newAccountPubkey: mint.publicKey,
    lamports: mintRent,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });

  const initAccoutnIx = createInitializeMintInstruction(
    mint.publicKey,
    decimals ?? 0,
    owner ?? payer,
    freezeAuthority ?? payer
  );

  const tx = new TransactionsBatch({
    instructions: [createIx, initAccoutnIx],
    signers: [mint],
  });

  return {
    mint,
    tx,
  };
};
