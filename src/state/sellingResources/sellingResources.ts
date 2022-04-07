import { SellingResourceArgs } from "@metaplex-foundation/mpl-fixed-price-sale";
import {
  attach,
  createEvent,
  createStore,
  forward,
  StoreValue,
} from "effector";

import { $connection } from "state/connection";
import { $markets } from "state/markets";

import { loadSellingResources } from "../../sdk/loadSellingResources";

enum Status {
  "Pending",
  "Fetched",
}
export const initialSellingRes = createEvent();
export const clearInitialSellingRes = createEvent();
export const $initialStoreProgress = createStore<Status>(Status.Pending)
  .on(initialSellingRes, () => Status.Fetched)
  .on(clearInitialSellingRes, () => Status.Pending);

export const $sellingResources = createStore<Map<string, SellingResourceArgs>>(
  new Map()
);

export const fetchSellingResourcesFx = attach({
  effect: async ({
    connection,
    markets,
  }: {
    connection: StoreValue<typeof $connection>;
    markets: StoreValue<typeof $markets>;
  }) =>
    loadSellingResources({
      markets,
      connection,
    }),
  source: {
    connection: $connection,
    markets: $markets,
  },
});

forward({
  from: fetchSellingResourcesFx.doneData,
  to: initialSellingRes,
});
forward({
  from: fetchSellingResourcesFx.doneData,
  to: $sellingResources,
});
forward({ from: [$connection, $markets], to: fetchSellingResourcesFx });
