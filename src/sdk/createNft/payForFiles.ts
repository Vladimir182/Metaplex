import { programs } from "@metaplex/js";
import { PublicKey } from "@solana/web3.js";
import { getFilesCost } from "utils/arweave-cost";
import { getFileHash } from "utils/crypto";
import { solToLamports } from "utils/solToLamports";
import { Wallet } from "wallet";
const { PayForFiles } = programs;

export const ARWEAVE_WALLET = new PublicKey(
  "6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS"
);

export interface IPayForFilesParams {
  wallet: Wallet;
  files: File[];
}

export async function payForFiles({ files, wallet: w }: IPayForFilesParams) {
  const fileHashes = await Promise.all(files.map((file) => getFileHash(file)));
  const { solana } = await getFilesCost(files);
  const lamports = solToLamports(solana);

  return new PayForFiles(
    { feePayer: w.publicKey },
    {
      arweaveWallet: ARWEAVE_WALLET,
      lamports,
      fileHashes,
    }
  );
}
