import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";

export const createTokenAccount = async ({
  payer,
  mint,
  connection,
  owner,
}: {
  payer: PublicKey;
  mint: PublicKey;
  connection: Connection;
  owner?: PublicKey;
}): Promise<{
  tokenAccount: Keypair;
  instructions: TransactionInstruction[];
}> => {
  const tokenAccount = Keypair.generate();
  const instructions: TransactionInstruction[] = [];

  const accountRentExempt = await connection.getMinimumBalanceForRentExemption(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    AccountLayout.span
  );

  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: tokenAccount.publicKey,
      lamports: accountRentExempt,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      space: AccountLayout.span,
      programId: new PublicKey(TOKEN_PROGRAM_ID),
    })
  );

  instructions.push(
    Token.createInitAccountInstruction(
      new PublicKey(TOKEN_PROGRAM_ID),
      mint,
      tokenAccount.publicKey,
      owner ?? payer
    )
  );

  return {
    tokenAccount,
    instructions,
  };
};
