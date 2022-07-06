import { ArweaveUploadResult } from "../types";

export function getFilePath(
  filename: string,
  arweaveResult: ArweaveUploadResult
) {
  const dataFile = arweaveResult.messages?.find((m) => m.filename === filename);

  if (!dataFile?.transactionId) {
    throw new Error("Failed to upload files");
  }

  return `https://arweave.net/${dataFile.transactionId}`;
}
