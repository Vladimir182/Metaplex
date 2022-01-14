import { Store } from "@metaplex-foundation/mpl-metaplex";
import { attach, createEffect, restore, sample, StoreValue } from "effector";
import { loadStore } from "sdk/loadStore";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";

const checkWalletStoreOriginFx = createEffect(
  async ({
    connection,
    wallet,
  }: {
    connection: StoreValue<typeof $connection>;
    wallet: StoreValue<typeof $wallet>;
  }) => {
    if (!wallet) return null;
    const storeAddress = await Store.getPDA(wallet.publicKey);
    const store = await loadStore({ connection, storeAddress });
    return (store?.owner && store.storeId) || null;
  }
);

sample({
  source: {
    connection: $connection,
    wallet: $wallet,
  },
  target: checkWalletStoreOriginFx,
});

export const checkWalletStoreFx = attach({
  effect: checkWalletStoreOriginFx,
  source: {
    connection: $connection,
    wallet: $wallet,
  },
});

export const $walletStoreId = restore(checkWalletStoreOriginFx, null);
