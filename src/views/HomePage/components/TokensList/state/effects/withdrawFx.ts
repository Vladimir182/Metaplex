import { attach, createEffect, StoreValue } from "effector";
import { PublicKey } from "@solana/web3.js";

import { $connection } from "state/connection";
import { $wallet } from "state/wallet";
import { withdraw } from "sdk/sale/withdraw";
import { $markets } from "state/markets";

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  markets: StoreValue<typeof $markets>;
}
export interface IParams {
  metadata: string;
  market: string;
}

export const withdrawFx = attach({
  effect: createEffect(
    async ({
      metadata,
      market,
      markets,
      wallet,
      connection,
    }: ISource & IParams) => {
      if (!wallet) {
        return;
      }

      const marketData = markets.get(market);

      if (!marketData) {
        return;
      }

      return withdraw({
        connection,
        wallet,
        marketData,
        market: new PublicKey(market),
        metadata: new PublicKey(metadata),
      });
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    markets: $markets,
  },
  mapParams: ({ metadata, market }: IParams, sources) => ({
    ...sources,
    metadata,
    market,
  }),
});
