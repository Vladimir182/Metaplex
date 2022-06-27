import { attach, createStore, forward, sample, StoreValue } from "effector";
import { loadArtworksByOwner } from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";

import { $store } from "../store";

export const $profileArtworks = createStore<IArt[]>([]);

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

export const $pendingProfileArtworks = fetchProfileArtworksFx.pending;
export const $isInitalLoadHappened = createStore<boolean>(false);

forward({ from: fetchProfileArtworksFx.doneData, to: $profileArtworks });
sample({
  clock: fetchProfileArtworksFx.doneData,
  fn: (s) => !!s,
  target: $isInitalLoadHappened,
});

sample({
  clock: [$connection, $store],
  target: fetchProfileArtworksFx,
});
