import { attach, createEffect, StoreValue } from "effector";
import { PublicKey } from "@solana/web3.js";

import { $connection } from "state/connection";
import { $wallet } from "state/wallet";
import { closeMarketAndWithdraw } from "sdk/sale/closeMarketAndWithdraw";
import { $markets } from "state/markets";
import { IArt } from "state/artworks";
import { $sellingResources } from "state/sellingResources";
import { $store } from "state/store";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";

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
  artwork: IArt;
  state: MarketState;
}

export const closeMarketAndWithdrawFx = attach({
  effect: createEffect(
    async ({
      metadata,
      market,
      state,
      artwork,
      markets,
      wallet,
      connection,
      sellingResources,
      store,
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

      return closeMarketAndWithdraw({
        connection,
        wallet,
        marketData,
        market: new PublicKey(market),
        state,
        metadata: new PublicKey(metadata),
        artwork,
        store: new PublicKey(store.storeId),
        sellingResourceData,
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
  mapParams: ({ metadata, market, state, artwork }: IParams, sources) => ({
    ...sources,
    metadata,
    market,
    artwork,
    state,
  }),
});
