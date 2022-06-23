import { Buffer } from "buffer";
import { sha256 } from "crypto-hash";

export const getFileHash = async (file: Buffer | File) => {
  const content = file instanceof Buffer ? file.toString() : await file.text();
  return Buffer.from(await sha256(content));
};
