import { useCallback, useMemo } from "react";
import { $pendingStoreArtworks, $storeArtworks } from "state/artworks";
import { $store } from "state/store";
import { useStore } from "effector-react";
import { createTabTools, isTab, TABS } from "utils/createTabTools";
import { submitInstantSaleFx } from "state/instant-sale";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { $tab, $artworksFilters } = useMemo(() => {
    // TODO: change $storeArtworks to $profileArtworks
    const state = createTabTools($storeArtworks, "all");
    return { ...state };
  }, []);
  const pendingArtworks = useStore($pendingStoreArtworks);
  const artworks = useStore($artworksFilters);

  const activeTab = useStore($tab.$node);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));

  const onSubmitInstantSale = useCallback((price: number, endDate: Date) => {
    submitInstantSaleFx({ price, endDate });
  }, []);

  const onChangeTab = useCallback(
    (id: string) => {
      if (isTab(id)) {
        $tab.set(id);
      }
    },
    [$tab.set]
  );

  return {
    form,
    storeId,
    activeTab,
    onChangeTab,
    tabs: TABS,
    artworks,
    pendingArtworks,
    onSubmitInstantSale,
  };
}
