import { PublicKey } from "@solana/web3.js";
import { attach, createEffect, StoreValue } from "effector";
import { closeMarketAndWithdraw } from "sdk/market/actions/closeMarketAndWithdraw";
import { $connection } from "state/connection";
import { IFixedPrice } from "state/sales";
import { $store } from "state/store";
import { $wallet } from "state/wallet";

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  store: StoreValue<typeof $store>;
}
export interface IParams {
  sale: IFixedPrice;
}

export const closeMarketAndWithdrawFx = attach({
  effect: createEffect(
    async ({ sale, wallet, connection, store }: ISource & IParams) => {
      if (!wallet || !store?.storeId) {
        return;
      }

      return closeMarketAndWithdraw({
        connection,
        wallet,
        sale,
        store: new PublicKey(store.storeId),
      });
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
  },
  mapParams: (params: IParams, sources) => ({
    ...sources,
    ...params,
  }),
});
