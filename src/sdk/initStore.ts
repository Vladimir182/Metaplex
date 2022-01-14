import { ArweaveStorage, Wallet } from "@metaplex/js";
import { actions } from "@metaplex/js";
import { Connection } from "@solana/web3.js";
import { EUploadProgress, uploadJson2Arweave } from "./uploadJson2Arweave";

const { initStoreV2 } = actions;

export interface InitStoreProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  json: Object;
  files: File[];
  updateProgress?: (status: EUploadProgress | null) => void;
  connection: Connection;
  wallet: Wallet;
  storage: ArweaveStorage;
}

export const initStore = async ({
  json,
  files,
  updateProgress,
  connection,
  wallet,
  storage,
}: InitStoreProps) => {
  const { settingsUri } = await uploadJson2Arweave({
    connection,
    wallet,
    files,
    json,
    mintKey: wallet.publicKey.toString(),
    storage,
    updateProgress,
  });

  const store = await initStoreV2({
    connection,
    wallet,
    isPublic: false,
    settingsUri,
  });

  await connection.confirmTransaction(store.txId, "max");
  // Force wait for max confirmations
  // await connection.confirmTransaction(txid, 'max');
  connection.getParsedConfirmedTransaction(store.txId, "confirmed");

  return store;
};
