import { attach, createEffect, StoreValue } from "effector";
import { PublicKey } from "@solana/web3.js";

import { claim } from "sdk/sale/claim";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";
import { $markets } from "state/markets";
import { $sellingResources } from "state/sellingResources";
import { $store } from "state/store";

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  markets: StoreValue<typeof $markets>;
  sellingResources: StoreValue<typeof $sellingResources>;
  store: StoreValue<typeof $store>;
}
export interface IParams {
  metadata: string;
  market: string;
}

export const claimFx = attach({
  effect: createEffect(
    async ({
      metadata,
      market,
      markets,
      sellingResources,
      store,
      wallet,
      connection,
    }: ISource & IParams) => {
      if (!wallet || !store?.storeId) {
        return;
      }

      const marketData = markets.get(market);
      if (!marketData) {
        return;
      }

      const sellingResourceData = sellingResources.get(
        marketData.sellingResource.toBase58()
      );
      if (!sellingResourceData) {
        return;
      }

      return claim({
        connection,
        wallet,
        sellingResourceData,
        marketData,
        market: new PublicKey(market),
        metadata: new PublicKey(metadata),
        store: new PublicKey(store.storeId),
      });
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    markets: $markets,
    sellingResources: $sellingResources,
    store: $store,
  },
  mapParams: ({ metadata, market }: IParams, sources) => ({
    ...sources,
    metadata,
    market,
  }),
});
