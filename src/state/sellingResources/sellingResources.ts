import { SellingResourceAccountDataArgs } from "@metaplex-foundation/mpl-fixed-price-sale";
import { attach, createStore, forward, StoreValue } from "effector";

import { $connection } from "state/connection";
import { $markets } from "state/markets";

import { loadSellingResources } from "../../sdk/loadSellingResources";

export const $sellingResources = createStore<
  Map<string, SellingResourceAccountDataArgs>
>(new Map());

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
forward({ from: fetchSellingResourcesFx.doneData, to: $sellingResources });
forward({ from: [$connection, $markets], to: fetchSellingResourcesFx });
