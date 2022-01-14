import { useStore } from "effector-react";
import { useCallback, useMemo } from "react";
import { $liveListings, $pendingListings } from "state/listing";
import { $isStoreAdmin, $store } from "state/store";
import { createListingTabTools, isTab, TABS } from "utils/createTabTools";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { $tab, $listingsFilters } = useMemo(() => {
    const state = createListingTabTools($liveListings, "all");
    return state;
  }, []);

  const listings = useStore($listingsFilters);
  const pendingArtworks = useStore($pendingListings);
  const activeTab = useStore($tab.$node);
  const form = useStore($store);
  const storeId = form?.storeId;
  const isSeller = useStore($isStoreAdmin);
  const onChangeTab = useCallback(
    (id: string) => {
      if (isTab(id)) {
        $tab.set(id);
      }
    },
    [$tab.set]
  );

  return {
    isSeller,
    storeId,
    form,
    activeTab,
    onChangeTab,
    tabs: TABS,
    listings,
    pendingArtworks,
  };
}
