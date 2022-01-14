import { attach, createEffect, StoreValue } from "effector";
import { initStore } from "sdk/initStore";
import { EUploadProgress } from "sdk/uploadJson2Arweave";
import { $connection } from "state/connection";
import { $storage } from "state/nft";
import { $wallet } from "state/wallet";

export interface IUploadJSON2ArweaveParams {
  // eslint-disable-next-line @typescript-eslint/ban-types
  json: Object;
  files: File[];
  updateProgress?: (status: EUploadProgress | null) => void;
}

export interface IMintArweaveSource {
  connection: StoreValue<typeof $connection>;
  storage: StoreValue<typeof $storage>;
  wallet: StoreValue<typeof $wallet>;
}

export type IUploadJSON2ArweaveParamsWithSource = IUploadJSON2ArweaveParams &
  IMintArweaveSource;

export const initStoreFx = attach({
  effect: createEffect(
    async ({
      json,
      files,
      updateProgress,
      connection,
      wallet,
      storage,
    }: IUploadJSON2ArweaveParamsWithSource) => {
      if (!wallet) {
        throw new Error("Wallet wasn't connected");
      }

      const store = await initStore({
        connection,
        wallet,
        storage,
        json,
        files,
        updateProgress,
      });

      return store;
    }
  ),
  source: {
    connection: $connection,
    storage: $storage,
    wallet: $wallet,
  },
  mapParams: (params: IUploadJSON2ArweaveParams, sources) => ({
    ...sources,
    ...params,
  }),
});
