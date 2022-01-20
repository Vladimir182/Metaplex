import { useStore } from "effector-react";
import { $pendingStore, $store } from "state/store";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const pendingStore = useStore($pendingStore);
  const form = useStore($store);
  const storeId = form?.storeId;

  return {
    pendingStore,
    storeId,
  };
}
