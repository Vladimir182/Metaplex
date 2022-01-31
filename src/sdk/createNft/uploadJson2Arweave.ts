import {
  actions,
  ArweaveStorage,
  ArweaveUploadResult,
  Connection,
  Wallet,
} from "@metaplex/js";
import { METADATA_FILE_NAME } from "utils/arweave-cost";
import { Pipeline } from "utils/pipeline";
import { EUploadProgress } from "../../enums/uploadProgress";
import { payForFiles } from "./payForFiles";

const { sendTransaction } = actions;

export interface IUploadFile2ArweaveResponse {
  txId: string;
  arweaveResult: ArweaveUploadResult;
  settingsUri: string;
}

export interface IUploadFile2ArweaveParams {
  connection: Connection;
  wallet: Wallet;
  storage: ArweaveStorage;
  // eslint-disable-next-line @typescript-eslint/ban-types
  json: Object;
  files: File[];
  mintKey: string;
  updateProgress?: (status: EUploadProgress | null) => void;
}

export async function uploadJson2Arweave({
  connection,
  wallet,
  json,
  files: uploadFiles,
  mintKey,
  storage,
  updateProgress = () => {},
}: IUploadFile2ArweaveParams): Promise<IUploadFile2ArweaveResponse> {
  const pipe = new Pipeline<EUploadProgress | null>(null, updateProgress);

  try {
    pipe.setStep(EUploadProgress.minting);

    const { payForFilesTx, files } = await pipe.exec(async () => {
      const metadataFile = new File([JSON.stringify(json)], METADATA_FILE_NAME);
      const files = [...uploadFiles, metadataFile];

      const payForFilesTx = await payForFiles({
        wallet,
        files,
      });

      return {
        payForFilesTx,
        files,
      };
    }, EUploadProgress.preparing_assets);

    const txid = await pipe.exec(
      () =>
        sendTransaction({
          connection,
          wallet,
          txs: [payForFilesTx],
        }),
      EUploadProgress.signing_metadata_transaction
    );

    await pipe.exec(
      () => connection.confirmTransaction(txid, "max"),
      EUploadProgress.sending_transaction_to_solana
    );

    await pipe.exec(
      () =>
        // Force wait for max confirmations
        // await connection.confirmTransaction(txid, 'max');
        connection.getParsedConfirmedTransaction(txid, "confirmed"),
      EUploadProgress.waiting_for_initial_confirmation
    );

    const { arweaveResult, dataFile } = await pipe.exec(async () => {
      const arweaveResult = await storage.upload(
        files as unknown as Map<string, Buffer>, // TODO: probably we need to update ArweaveStorage interface
        mintKey, // TODO: probably pass key `store` instead `mint`
        txid
      );
      const dataFile = arweaveResult.messages?.find(
        (m) => m.filename === METADATA_FILE_NAME
      );
      return { arweaveResult, dataFile };
    }, EUploadProgress.waiting_for_final_confirmation);

    pipe.setStep(EUploadProgress.uploading_to_arweave);

    if (!dataFile?.transactionId) {
      throw new Error("Failed to upload file");
    }

    return {
      settingsUri: `https://arweave.net/${dataFile.transactionId}`,
      arweaveResult,
      txId: txid,
    };
  } catch (err) {
    pipe.setStep(null);
    throw err;
  }
}
