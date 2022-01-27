import { SellingResourceAccountDataArgs } from "@metaplex-foundation/mpl-membership-token";
import { attach, createStore, forward, StoreValue } from "effector";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { loadSellingResources } from "../../sdk/loadSellingResources";

export const $sellingResources = createStore<
  Map<string, SellingResourceAccountDataArgs>
>(new Map());

export const fetchSellingResourcesFx = attach({
  effect: async ({
    connection,
    store,
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
  }) => {
    if (!store) {
      return new Map();
    }

    return loadSellingResources({
      store: store.storeId,
      connection,
    });
  },
  source: {
    connection: $connection,
    store: $store,
  },
});
forward({ from: fetchSellingResourcesFx.doneData, to: $sellingResources });
forward({ from: [$connection, $store], to: fetchSellingResourcesFx });

export const $pendingSellingResources = fetchSellingResourcesFx.pending;
