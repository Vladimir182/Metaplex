import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { PublicKey } from "@solana/web3.js";
import { attach, createEffect, StoreValue } from "effector";

import { createCachedStore } from "../cache";
import { $connection } from "../connection";
import { $wallet } from "../wallet";

import { readCachedStoreFx, writeCachedStoreFx } from "./cached";
import { loadStoreByOwnerFx } from "./loadStoreByOwnerFx";
import { IStoreConfig } from "./types";

export type IStore = IStoreConfig & {
  admin: AnyPublicKey;
  storeId: string;
  name: string;
};

export interface ILoadStoreSource {
  wallet: StoreValue<typeof $wallet>;
}

const cachedStore = createCachedStore<IStore | null, PublicKey>({
  defaultValue: null,
  fetchFx: loadStoreByOwnerFx,
  readCacheFx: readCachedStoreFx,
  writeCacheFx: writeCachedStoreFx,
});

export const { $store, $pending } = cachedStore;

export const $hasStore = $store.map((store) => !!store);

export const loadStoreFx = attach({
  effect: createEffect(async ({ wallet }: ILoadStoreSource) => {
    if (!wallet) return null;
    try {
      const cached = await readCachedStoreFx(wallet?.publicKey);
      if (cached) return cached;
    } catch (e) {
      //ignore
    }
    return await loadStoreByOwnerFx(wallet?.publicKey);
  }),
  source: {
    connection: $connection,
    wallet: $wallet,
  },
});
