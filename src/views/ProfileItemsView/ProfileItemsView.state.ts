import { ITab } from "components/ArtworksGrid";
import type { ListForSaleDialog } from "components/ListForSaleDialog";
import { useStore } from "effector-react";
import { ComponentProps, useCallback, useMemo } from "react";
import {
  $pendingProfileArtworks,
  $profileArtworks,
  fetchProfileArtworksFx,
  IArt,
} from "state/artworks";
import { submitInstantSaleFx } from "state/instant-sale";
import { createEntry } from "state/utils";
import { $user } from "state/wallet";
import { createTabTools, isTab, TABS } from "utils/createTabTools";

type ListForSaleDialogProps = ComponentProps<typeof ListForSaleDialog>;

function createLocalState() {
  const tabsTools = createTabTools($profileArtworks, "all");
  const $art = createEntry<IArt | null>(null);
  const $artworkSummary = $art.$node.map((state) => {
    const ret: ListForSaleDialogProps["artworkSummary"] = {
      img: state?.image ?? "",
      title: state?.title ?? "",
      artist: "", // TODO: ???
      edition: "", // TODO: ???
      total: state?.prints?.supply ?? 0,
    };
    return ret;
  });

  return { ...tabsTools, $artworkSummary, $art };
}

export const useLocalState = () => {
  const { $tab, $artworkSummary, $art, ...tools } = useMemo(() => {
    const onRefresh = () => {
      fetchProfileArtworksFx();
    };
    const tools = createLocalState();
    return { onRefresh, ...tools };
  }, []);

  const artworks = useStore(tools.$artworksFilters);
  const user = useStore($user);

  const activeTab = useStore($tab.$node);

  const onChangeTabs = useCallback(
    (id: string) => {
      if (isTab(id)) {
        $tab.set(id);
      }
    },
    [$tab.set]
  );
  const artworkSummary = useStore($artworkSummary);
  const pendingArtworks = useStore($pendingProfileArtworks);
  const art = useStore($art.$node);

  const hideModal = useCallback(() => {
    $art.set(null);
  }, []);

  const onSubmitInstantSale = useCallback((price: number, endDate: Date) => {
    submitInstantSaleFx({ price, endDate });
  }, []);

  return {
    activeTab,
    user,
    tabs: TABS as unknown as ITab[],
    artworks,
    pendingArtworks,
    onRefresh: tools.onRefresh,
    onChangeTabs,
    isShowListForSale: !!art,
    hideModal,
    artworkSummary,
    onSubmitInstantSale,
  };
};
