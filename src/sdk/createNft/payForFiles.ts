import { getFileHash } from "utils/crypto";
import { PublicKey } from "@solana/web3.js";
import { programs, Wallet } from "@metaplex/js";
import { getFilesCost } from "utils/arweave-cost";
import { solToLamports } from "utils/solToLamports";
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
