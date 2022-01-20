import { attach, createStore, forward, StoreValue } from "effector";
import { loadArtworksByCreators } from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $store } from "state/store";

export const $storeArtworks = createStore<IArt[]>([]);

export const fetchStoreArtworksFx = attach({
  effect: async ({
    connection,
    store,
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
  }) => {
    if (!store) {
      return [];
    }

    return await loadArtworksByCreators({
      connection,
      creators: [store.admin],
    });
  },
  source: {
    connection: $connection,
    store: $store,
  },
});
forward({ from: fetchStoreArtworksFx.doneData, to: $storeArtworks });
forward({ from: [$connection, $store], to: fetchStoreArtworksFx });

export const $pendingStoreArtworks = fetchStoreArtworksFx.pending;
