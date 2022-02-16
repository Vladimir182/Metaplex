import { attach, createEffect, StoreValue } from "effector";
import { PublicKey } from "@solana/web3.js";

import { $connection } from "state/connection";
import { $wallet } from "state/wallet";
import { closeMarket } from "sdk/sale/closeMarket";

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
}
export interface IParams {
  market: string;
}

export const closeMarketFx = attach({
  effect: createEffect(
    async ({ market, wallet, connection }: ISource & IParams) => {
      if (!wallet) {
        return;
      }

      return closeMarket({
        connection,
        wallet,
        market: new PublicKey(market),
      });
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
  },
  mapParams: ({ market }: IParams, sources) => ({
    ...sources,
    market,
  }),
});
