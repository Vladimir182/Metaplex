import { MarketArgs } from "@metaplex-foundation/mpl-fixed-price-sale";
import {
  attach,
  createEvent,
  createStore,
  forward,
  sample,
  StoreValue,
} from "effector";
import { interval } from "patronum";
import { $connection } from "state/connection";
import { $store } from "state/store";

import { loadMarkets } from "../../sdk/loadMarkets";

export const $markets = createStore<Map<string, MarketArgs>>(new Map());

export const startStoreFetch = createEvent();
export const stopStoreFetch = createEvent();

const { tick } = interval({
  timeout: 5000,
  start: startStoreFetch,
  stop: stopStoreFetch,
});

export const fetchMarketsFx = attach({
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
    return loadMarkets({
      store: store.storeId,
      connection,
    });
  },
  source: {
    connection: $connection,
    store: $store,
  },
});
forward({ from: fetchMarketsFx.doneData, to: $markets });
forward({ from: [$connection, $store], to: fetchMarketsFx });
sample({ clock: tick, target: fetchMarketsFx });
