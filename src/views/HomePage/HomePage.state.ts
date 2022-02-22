import { useStore } from "effector-react";
import { $storeResponse } from "state/store";
import { stopStoreFetch } from "state/markets";
import { clearInitialSellingRes } from "state/sellingResources";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { pendingStore, storeData } = useStore($storeResponse);
  const onPageUnload = () => {
    stopStoreFetch();
    clearInitialSellingRes();
  };

  return {
    pendingStore,
    storeId: storeData?.storeId,
    onPageUnload,
  };
}
