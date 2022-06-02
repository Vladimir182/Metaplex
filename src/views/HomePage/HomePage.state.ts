import { useStore } from "effector-react";
import { $storeResponse } from "state/store";
import { stopStoreFetch } from "state/markets";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { pendingStore, storeData } = useStore($storeResponse);
  const onPageUnload = () => {
    stopStoreFetch();
  };

  return {
    pendingStore,
    storeId: storeData?.storeId,
    onPageUnload,
  };
}
