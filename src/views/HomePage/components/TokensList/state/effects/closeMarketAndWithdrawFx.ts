import { AccountLayout } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { attach, createEffect, StoreValue } from "effector";
import { closeMarketAndWithdraw } from "sdk/market/actions/closeMarketAndWithdraw";
import { loadAccountAndDeserialize } from "sdk/share";
import { $connection } from "state/connection";
import { IFixedPrice } from "state/sales";
import { $store } from "state/store";
import { $wallet } from "state/wallet";
import { parseBN } from "utils/parseBN";
import { toPubkey } from "utils/toPubkey";
import { waitForResponse } from "utils/waitForResponse";

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

      await closeMarketAndWithdraw({
        connection,
        wallet,
        sale,
        store: new PublicKey(store.storeId),
      });

      await waitForResponse(async () => {
        const tokenAccount = await loadAccountAndDeserialize(
          connection,
          AccountLayout,
          toPubkey(sale.refs.vault)
        );
        return parseBN(tokenAccount.amount) === 0;
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
