import { getFileHash } from "utils/crypto";
import { getFilesCostInfo } from "utils/arweave-cost";
import { PublicKey } from "@solana/web3.js";
import { programs, Wallet } from "@metaplex/js";
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
  const { lamports } = await getFilesCostInfo(files);

  return new PayForFiles(
    { feePayer: w.publicKey },
    {
      arweaveWallet: ARWEAVE_WALLET,
      lamports,
      fileHashes,
    }
  );
}
