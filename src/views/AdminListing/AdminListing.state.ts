import { useStore } from "effector-react";
import { useCallback, useMemo } from "react";
import { $allListings, $pendingListings } from "state/listing";
import { $store } from "state/store";
import { createListingTabTools, isTab, TABS } from "utils/createTabTools";

export type ViewMode = "list" | "grid";

export function useLocalState() {
  const { $tab, $listingsFilters } = useMemo(() => {
    const state = createListingTabTools($allListings, "sale");
    return { ...state };
  }, []);
  const pendingArtworks = useStore($pendingListings);
  const listings = useStore($listingsFilters);

  const activeTab = useStore($tab.$node);
  const form = useStore($store);

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
    activeTab,
    onChangeTab,
    tabs: TABS,
    listings,
    pendingArtworks,
  };
}
