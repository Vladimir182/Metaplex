import { attach, createEffect, sample, StoreValue } from "effector";
import { $connection } from "state/connection";
import { $store, loadStoreFx } from "state/store";
import { $wallet } from "state/wallet";

export const checkWalletStoreOriginFx = attach({
  effect: createEffect(
    async ({ store }: { store: StoreValue<typeof $store> }) => {
      store = store || (await loadStoreFx());
      return (store?.admin && store.storeId) || null;
    }
  ),
  source: {
    store: $store,
  },
});

sample({
  source: {
    connection: $connection,
    wallet: $wallet,
  },
  target: checkWalletStoreOriginFx,
});
