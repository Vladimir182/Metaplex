import { useEffect } from "react";
import { useStore } from "effector-react";
import { loadStoreFx } from "state/store";
import { $store } from "state/store";

import { useWalletStoreId } from "./useWalletStoreId";

export function useWalletStore() {
  const $pending = loadStoreFx.pending;

  const [walletStoreId, error] = useWalletStoreId();
  const store = useStore($store);
  const pending = useStore($pending);

  useEffect(() => {
    if (store || pending || !walletStoreId) {
      return;
    }
    loadStoreFx();
  }, [walletStoreId, error, pending, store, loadStoreFx]);

  return { store, pending };
}
