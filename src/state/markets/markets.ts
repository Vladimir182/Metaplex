import { MarketAccountDataArgs } from "@metaplex-foundation/mpl-membership-token";
import { attach, createStore, forward, StoreValue } from "effector";
import { $connection } from "state/connection";
import { loadMarkets } from "../../sdk/loadMarkets";
import { $sellingResources } from "../sellingResources";

export const $markets = createStore<Map<string, MarketAccountDataArgs>>(
  new Map()
);

export const fetchMarketsFx = attach({
  effect: async ({
    connection,
    sellingResources,
  }: {
    connection: StoreValue<typeof $connection>;
    sellingResources: StoreValue<typeof $sellingResources>;
  }) =>
    loadMarkets({
      sellingResources,
      connection,
    }),
  source: {
    connection: $connection,
    sellingResources: $sellingResources,
  },
});
forward({ from: fetchMarketsFx.doneData, to: $markets });
forward({ from: [$connection, $sellingResources], to: fetchMarketsFx });

export const $pendingMarkets = fetchMarketsFx.pending;
