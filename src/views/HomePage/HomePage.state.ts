import { useEffect } from "react";
import { useWalletStore } from "state/react/useWalletStore";
import { startSalesFetch, stopSalesFetch } from "state/sales";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { store, pending } = useWalletStore();

  useEffect(() => {
    startSalesFetch();

    return () => {
      stopSalesFetch();
    };
  }, [store]);

  return {
    pending,
    store,
  };
}
