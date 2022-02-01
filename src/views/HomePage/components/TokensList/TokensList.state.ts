import { $store } from "state/store";
import { useStore } from "effector-react";
import { $pendingStoreArtworks, $storeArtworks } from "state/artworks";
import { $pendingMarkets } from "state/markets";
import { $pendingSellingResources } from "state/sellingResources";

export function useLocalState() {
  const pendingArtworks = useStore($pendingStoreArtworks);
  const artworks = useStore($storeArtworks);
  const pendingSellingResources = useStore($pendingSellingResources);
  const pendingMarkets = useStore($pendingMarkets);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));

  const pending = pendingArtworks || pendingSellingResources || pendingMarkets;

  return {
    form,
    storeId,
    artworks,
    pending,
  };
}
