import { Cluster } from "@solana/web3.js";
import { attach, Effect } from "effector";
import { composeKey, readCacheFx, writeCacheFx } from "state/cache";
import { $network } from "state/connection";
import { $store, IStore } from "state/store";

import { IFixedPrice } from "./types";

const getKey = (store: IStore | null, network: Cluster) =>
  composeKey([network, "sales", store?.storeId]);

export const readCachedSalesFx = attach({
  effect: readCacheFx,
  source: { network: $network, store: $store },
  mapParams: (_: unknown, { network, store }) => ({
    key: getKey(store, network),
  }),
}) as Effect<void, IFixedPrice[]>;

export const writeCachedSalesFx = attach({
  effect: writeCacheFx,
  source: { network: $network, store: $store },
  mapParams: (value: IFixedPrice[], { network, store }) => ({
    value,
    key: getKey(store, network),
  }),
});
