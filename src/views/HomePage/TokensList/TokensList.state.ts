import { $store } from "state/store";
import { useStore } from "effector-react";
import { $pendingStoreArtworks, $storeArtworks } from "state/artworks";
import { $pendingMarkets, $markets } from "state/markets";
import {
  $pendingSellingResources,
  $sellingResources,
} from "state/sellingResources";

export function useLocalState() {
  const pendingArtworks = useStore($pendingStoreArtworks);
  const artworks = useStore($storeArtworks);
  const pendingSellingResources = useStore($pendingSellingResources);
  const sellingResources = useStore($sellingResources);
  const pendingMarkets = useStore($pendingMarkets);
  const markets = useStore($markets);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));

  const pending = pendingArtworks || pendingSellingResources || pendingMarkets;

  return {
    form,
    storeId,
    artworks,
    sellingResources,
    markets,
    pending,
  };
}
