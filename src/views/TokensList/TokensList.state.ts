import { $store } from "state/store";
import { useStore } from "effector-react";
import { $pendingStoreArtworks, $storeArtworks } from "state/artworks";

export function useLocalState() {
  const pendingArtworks = useStore($pendingStoreArtworks);
  const artworks = useStore($storeArtworks);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));

  return {
    form,
    storeId,
    artworks,
    pendingArtworks,
  };
}
