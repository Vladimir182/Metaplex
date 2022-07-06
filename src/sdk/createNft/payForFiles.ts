import { config } from "@metaplex-foundation/mpl-core";
import {
  Connection,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { createAndSignTransaction } from "sdk/transactions/createAndSignTransaction";
import { solToLamports } from "utils/solToLamports";
import { toPubkey } from "utils/toPubkey";
import { Wallet } from "wallet";

import { getFileHash, getFilesCost } from "./utils";

export const ARWEAVE_WALLET = toPubkey(
  "6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS"
);

export interface IPayForFilesParams {
  connection: Connection;
  wallet: Wallet;
  files: File[];
}

export async function payForFiles({
  connection,
  files,
  wallet,
}: IPayForFilesParams) {
  const fileHashes = await Promise.all(files.map((file) => getFileHash(file)));
  const { solana } = await getFilesCost(files);
  const lamports = solToLamports(solana);

  const ix = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: ARWEAVE_WALLET,
    lamports,
  });

  const ixs = fileHashes.map(
    (data) =>
      new TransactionInstruction({
        keys: [],
        programId: toPubkey(config.programs.memo),
        data,
      })
  );

  return createAndSignTransaction([ix, ...ixs], connection, wallet, []);
}
