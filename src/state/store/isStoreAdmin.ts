import { combine } from "effector";
import { $store } from "./store";
import { $wallet } from "state/wallet";

export const $isStoreAdmin = combine($store, $wallet, (store, wallet) => {
  const owner = store?.admin ?? null;
  const walletStoreId = wallet?.publicKey.toString() ?? null;
  return owner === null || walletStoreId === null
    ? null
    : owner === walletStoreId;
});
