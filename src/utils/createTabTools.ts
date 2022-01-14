import { AuctionState } from "@metaplex-foundation/mpl-auction";
import { ITab } from "components/ArtworksGrid";
import { combine, Store } from "effector";
import { ArtType, IArt } from "state/artworks/types";
import { Listing } from "state/listing";
import { createEntry } from "state/utils";

export type TTab = "all" | "masters" | "editions" | "sale" | "sold";

export const TABS_CONFIG = [
  {
    id: "all",
    title: "All",
  },
  { id: "masters", title: "Masters" },
  { id: "editions", title: "Editions" },
  { id: "sale", title: "For sale" },
  { id: "sold", title: "Sold" },
] as const;

export const TABS = TABS_CONFIG as unknown as ITab[];

export function isTab(tab: string): tab is TTab {
  return !!TABS.find((p) => p.id === tab);
}

export function createTabTools($artworks: Store<IArt[]>, defaultValue: TTab) {
  const $tab = createEntry<TTab>(defaultValue);
  const $artworksFilters = combine($artworks, $tab.$node, (list, tab) => {
    switch (tab) {
      case "masters":
        return list.filter((it) => it.type === ArtType.Master);
      case "editions":
        return list.filter((it) => it.type !== ArtType.Master);
      case "all":
      default:
        return list;
    }
  });

  return { $tab, $artworksFilters };
}

export function createListingTabTools(
  $listings: Store<Listing[]>,
  defaultValue: TTab
) {
  const $tab = createEntry<TTab>(defaultValue);
  const $listingsFilters = combine($listings, $tab.$node, (list, tab) => {
    switch (tab) {
      case "masters":
        return list.filter((it) => it.artwork.type === ArtType.Master);
      case "editions":
        return list.filter((it) => it.artwork.type !== ArtType.Master);
      case "sale":
        return list.filter((it) => it.status === AuctionState.Started);
      case "sold":
        return list.filter((it) => it.status === AuctionState.Ended);
      case "all":
      default:
        return list;
    }
  });

  return { $tab, $listingsFilters };
}
