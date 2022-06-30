import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Wallet } from "wallet";

export async function createAndSignTransaction(
  instructions: TransactionInstruction[],
  connection: Connection,
  payer: Wallet,
  signers: Keypair[]
): Promise<Transaction> {
  const tx = new Transaction();
  instructions.forEach((instruction) => {
    tx.add(instruction);
  });
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  tx.feePayer = payer.publicKey;
  if (signers.length > 0) {
    tx.partialSign(...signers);
  }

  return tx;
}
