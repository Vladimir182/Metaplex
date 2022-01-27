import { attach, createStore, forward, StoreValue } from "effector";
import { loadArtworksByAccounts, loadArtworksByOwner } from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { loadSellingResourcesTokenAccounts } from "../../sdk/loadSellingResources";
import { $sellingResources } from "../sellingResources";

export const $storeArtworks = createStore<IArt[]>([]);

export const fetchStoreArtworksFx = attach({
  effect: async ({
    connection,
    store,
    sellingResources,
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
    sellingResources: StoreValue<typeof $sellingResources>;
  }) => {
    if (!store) {
      return [];
    }

    const userArtworks = await loadArtworksByOwner({
      connection,
      owner: store.admin,
    });

    const sellingResourcesTokenAccounts =
      await loadSellingResourcesTokenAccounts({
        connection,
        sellingResources,
      });

    // artworks that are on sale
    const storeArtworks = sellingResourcesTokenAccounts
      ? await loadArtworksByAccounts({
          connection,
          accounts: sellingResourcesTokenAccounts,
        })
      : [];

    return [...userArtworks, ...storeArtworks];
  },
  source: {
    connection: $connection,
    store: $store,
    sellingResources: $sellingResources,
  },
});
forward({ from: fetchStoreArtworksFx.doneData, to: $storeArtworks });
forward({
  from: [$connection, $store, $sellingResources],
  to: fetchStoreArtworksFx,
});

export const $pendingStoreArtworks = fetchStoreArtworksFx.pending;
