import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { attach, createEffect, StoreValue, restore } from "effector";
import { loadStore } from "sdk/loadStore";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";
import { IStoreConfig } from "./types";

export type IStore = IStoreConfig & {
  admin: AnyPublicKey;
  storeId: string;
  name: string;
};

export interface ILoadStoreSource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
}

export const loadStoreFx = attach({
  effect: createEffect(async ({ connection, wallet }: ILoadStoreSource) => {
    if (!wallet) return null;
    return await loadStore({ connection, owner: wallet?.publicKey });
  }),
  source: {
    connection: $connection,
    wallet: $wallet,
  },
});

export const $store = restore(loadStoreFx.doneData, null);

export const $pendingStore = loadStoreFx.pending;

export const $hasStore = restore(
  loadStoreFx.finally.map((state) => (!state ? null : state.status === "done")),
  null
);
