import { useStore } from "effector-react";
import { stopStoreFetch } from "state/markets";
import { clearInitialSellingRes } from "state/sellingResources";
import { $pendingStore, $store } from "state/store";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const pendingStore = useStore($pendingStore);
  const form = useStore($store);
  const storeId = form?.storeId;
  const onPageUnload = () => {
    stopStoreFetch();
    clearInitialSellingRes();
  };

  return {
    pendingStore,
    storeId,
    onPageUnload,
  };
}
