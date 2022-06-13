import { startStoreFetch, stopStoreFetch } from "state/markets";
import { useWalletStore } from "../../state/react/useWalletStore";
import { useEffect } from "react";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { store, pending } = useWalletStore();

  const onPageUnload = () => {
    stopStoreFetch();
  };

  useEffect(() => {
    startStoreFetch();
    return () => {
      onPageUnload();
    };
  }, [store]);

  return {
    pending,
    store,
  };
}
