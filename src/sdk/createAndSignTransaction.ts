import { Wallet } from "@metaplex/js";
import {
  Connection,
  Transaction,
  TransactionInstruction,
  Keypair,
} from "@solana/web3.js";

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
  tx.partialSign(...signers);

  return tx;
}