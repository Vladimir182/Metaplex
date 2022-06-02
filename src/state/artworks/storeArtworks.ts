import { attach, createStore, forward, sample, StoreValue } from "effector";
import {
  loadArtworksByOwner,
  loadArtworksBySellingResource,
} from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { $wallet } from "state/wallet";

import { $markets } from "../markets";
import { $sellingResources } from "../sellingResources";
import { logAsyncExecTime } from "../../utils/logAsyncExecTime";

export const $storeArtworks = createStore<IArt[]>([]);

export const fetchStoreArtworksFx = attach({
  effect: async ({
    connection,
    store,
    sellingResources,
    markets,
    wallet,
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
    sellingResources: StoreValue<typeof $sellingResources>;
    markets: StoreValue<typeof $markets>;
    wallet: StoreValue<typeof $wallet>;
  }) => {
    if (!store) {
      return [];
    }

    let userArtworks: IArt[] = [];
    let storeArtworks: IArt[] = [];

    await logAsyncExecTime("storeArtworks time", async () => {
      userArtworks = await loadArtworksByOwner({
        connection,
        owner: store.admin,
      });

      if (!wallet) return;

      // artworks that are on sale
      storeArtworks = await loadArtworksBySellingResource({
        connection,
        sellingResources,
        markets,
        wallet,
      });
    });

    const storeArtworksSort = [...userArtworks, ...storeArtworks].sort(
      (art1, art2) => (art1.title > art2.title ? 1 : -1)
    );

    return storeArtworksSort;
  },
  source: {
    connection: $connection,
    store: $store,
    sellingResources: $sellingResources,
    markets: $markets,
    wallet: $wallet,
  },
});

export const $isInitalLoadHappened = createStore<boolean>(false);

sample({
  clock: fetchStoreArtworksFx.doneData,
  fn: (s) => !!s,
  target: $isInitalLoadHappened,
});

forward({ from: fetchStoreArtworksFx.doneData, to: $storeArtworks });
forward({
  from: [$connection, $store, $sellingResources, $markets],
  to: fetchStoreArtworksFx,
});
