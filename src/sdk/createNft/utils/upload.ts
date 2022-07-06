import { Cluster } from "@solana/web3.js";
import axios from "axios";
import FormData from "form-data";

import { ArweaveUploadResult } from "../types";

export const ARWEAVE_UPLOAD_ENDPOINT =
  "https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile";

interface UploadProps {
  files: File[];
  mintKey: string;
  txId: string;
  network: Cluster;
}

export async function upload({ files, mintKey, txId, network }: UploadProps) {
  const fileEntries = Array.from(files.entries());
  const tags = fileEntries.reduce(
    (acc: Record<string, { name: string; value: string }[]>, [fileName]) => {
      acc[fileName] = [{ name: "mint", value: mintKey }];
      return acc;
    },
    {}
  );

  const body = new FormData();

  body.append("tags", JSON.stringify(tags));
  body.append("transaction", txId);
  body.append("env", network);
  fileEntries.map(([, file]) => {
    body.append("file[]", file);
  });

  const request = axios.post<ArweaveUploadResult>(
    ARWEAVE_UPLOAD_ENDPOINT,
    body
  );

  try {
    const response = await request;
    return response.data;
  } catch (e) {
    throw "Failed to upload file";
  }
}
