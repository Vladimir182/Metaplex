import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { Cluster, Connection } from "@solana/web3.js";
import { sendTransactions } from "sdk/transactions";
import { Wallet } from "wallet";

import { METADATA_FILE_NAME } from "./consts";
import { payForFiles } from "./payForFiles";
import { getFilePath, upload } from "./utils";

export enum EUploadProgress {
  preparing_assets,
  signing_metadata_transaction,
  sending_transaction_to_solana,
  uploading_to_arweave,
}

interface IUploadFile2ArweaveParams {
  connection: Connection;
  wallet: Wallet;
  network: Cluster;
  meta: string;
  file: File;
  mintKey: StringPublicKey;
  updateProgress?: (status: EUploadProgress | null) => void;
}

export const uploadFiles2Arweave = async ({
  connection,
  wallet,
  meta,
  file,
  mintKey,
  network,
  updateProgress,
}: IUploadFile2ArweaveParams) => {
  updateProgress?.(EUploadProgress.preparing_assets);

  const metadataFile = new File([meta], METADATA_FILE_NAME);
  const files = [file, metadataFile];

  const payForFilesTx = await payForFiles({
    connection,
    wallet,
    files,
  });

  updateProgress?.(EUploadProgress.signing_metadata_transaction);
  const [txId] = await sendTransactions(connection, wallet, [payForFilesTx]);

  updateProgress?.(EUploadProgress.uploading_to_arweave);
  const arweaveResult = await upload({
    files,
    mintKey,
    txId,
    network,
  });
  const fileUri = getFilePath(METADATA_FILE_NAME, arweaveResult);

  return {
    fileUri,
    arweaveResult,
  };
};
