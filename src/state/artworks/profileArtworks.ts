import { attach, createStore, sample, StoreValue } from "effector";
import { loadArtworksByOwner } from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";

import { createCachedStore } from "../cache";
import { $store } from "../store";

import { readCachedArtsFx, writeCachedArtsFx } from "./cached";

export const fetchProfileArtworksFx = attach({
  effect: async ({
    connection,
    wallet,
    store,
  }: {
    connection: StoreValue<typeof $connection>;
    wallet: StoreValue<typeof $wallet>;
    store: StoreValue<typeof $store>;
  }) => {
    if (!wallet) {
      throw new Error("wallet isn't initialize");
    }

    if (!store) return [];

    return await loadArtworksByOwner({
      connection,
      owner: wallet.publicKey,
    });
  },
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
  },
});

export const $isInitalLoadHappened = createStore<boolean>(false);
const cachedArtworks = createCachedStore<IArt[]>({
  defaultValue: [],
  checkEmpty: (v) => !!v.length,
  readCacheFx: readCachedArtsFx,
  writeCacheFx: writeCachedArtsFx,
  fetchFx: fetchProfileArtworksFx,
});

export const $profileArtworks = cachedArtworks.$store;
export const $pendingProfileArtworks = cachedArtworks.$pending;

const fetchCachedArtworksFx = attach({
  effect: async ({
    artworks,
  }: {
    artworks: StoreValue<typeof $profileArtworks>;
  }) => {
    if (artworks && artworks.length > 0) {
      return artworks;
    }

    try {
      const cachedArts = await readCachedArtsFx();
      if (cachedArts && cachedArts.length > 0) {
        return cachedArts;
      }
    } catch (e) {
      //ignore
    }

    return await fetchProfileArtworksFx();
  },
  source: {
    artworks: $profileArtworks,
  },
});

sample({
  clock: fetchCachedArtworksFx.doneData,
  fn: (s) => !!s,
  target: $isInitalLoadHappened,
});

sample({
  clock: [$connection, $store, $wallet],
  target: fetchCachedArtworksFx,
});
