import {
  attach,
  createEvent,
  createStore,
  forward,
  sample,
  StoreValue,
} from "effector";
import { interval } from "patronum";
import { loadMarkets } from "sdk/markets";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { $wallet } from "state/wallet";

import { IFixedPrice } from "./types";

export const $sales = createStore<IFixedPrice[]>([]);

export const startSalesFetch = createEvent();
export const stopSalesFetch = createEvent();

const { tick } = interval({
  timeout: 5000,
  start: startSalesFetch,
  stop: stopSalesFetch,
});

export const fetchSalesFx = attach({
  effect: async ({
    connection,
    store,
    wallet,
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
    wallet: StoreValue<typeof $wallet>;
  }) => {
    if (!store || !wallet) {
      return [];
    }

    return loadMarkets({
      store: store.storeId,
      connection,
      wallet,
    });
  },
  source: {
    connection: $connection,
    store: $store,
    wallet: $wallet,
  },
});

forward({ from: fetchSalesFx.doneData, to: $sales });
forward({ from: [$connection, $store], to: fetchSalesFx });
sample({ clock: tick, target: fetchSalesFx });
