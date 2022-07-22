import { attach, createEvent, forward, sample, StoreValue } from "effector";
import { interval } from "patronum";
import { loadMarkets } from "sdk/markets";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { $wallet } from "state/wallet";

import { createCachedStore } from "../cache";

import { readCachedSalesFx, writeCachedSalesFx } from "./cached";
import { IFixedPrice } from "./types";

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

const cachedSales = createCachedStore<IFixedPrice[]>({
  defaultValue: [],
  checkEmpty: (v) => !!v.length,
  readCacheFx: readCachedSalesFx,
  writeCacheFx: writeCachedSalesFx,
  fetchFx: fetchSalesFx,
});
export const $sales = cachedSales.$store;

forward({ from: [$connection, $store], to: fetchSalesFx });
sample({ clock: tick, target: fetchSalesFx });
