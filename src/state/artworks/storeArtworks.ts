import { attach, createStore, forward, StoreValue } from "effector";
import {
  loadArtworksByOwner,
  loadArtworksBySellingResource,
} from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $store } from "state/store";
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
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
    sellingResources: StoreValue<typeof $sellingResources>;
    markets: StoreValue<typeof $markets>;
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

      // artworks that are on sale
      storeArtworks = await loadArtworksBySellingResource({
        connection,
        sellingResources,
        markets,
      });
    });

    return [...userArtworks, ...storeArtworks];
  },
  source: {
    connection: $connection,
    store: $store,
    sellingResources: $sellingResources,
    markets: $markets,
  },
});
forward({ from: fetchStoreArtworksFx.doneData, to: $storeArtworks });
forward({
  from: [$connection, $store, $sellingResources, $markets],
  to: fetchStoreArtworksFx,
});

export const $pendingStoreArtworks = fetchStoreArtworksFx.pending;
