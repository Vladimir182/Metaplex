import { useStore } from "effector-react";
import { useMemo } from "react";
import { $isInitalLoadHappened, $storeArtworks } from "state/artworks";
import { $wallet } from "state/wallet";
import { $progress } from "views/HomePage/components/TokensList/state/store/progress";

export interface IArtworkSummary {
  img: string;
  title: string;
  artist: string;
  edition: number;
  total: number | string;
  description: string;
  owner?: string;
  price?: number;
  primarySaleAmount?: number;
}
export function useLocalState(itemId?: string) {
  const artworks = useStore($storeArtworks);
  const isInitalLoadHappened = useStore($isInitalLoadHappened);
  const wallet = useStore($wallet);
  const progress = useStore($progress.$node);

  const artwork = useMemo(
    () => artworks.find(({ id }) => id === itemId),
    [artworks, itemId]
  );

  const artworkSummary: IArtworkSummary | null = useMemo(() => {
    if (!artwork?.prints) {
      return null;
    }

    return {
      img: artwork.image,
      title: artwork.title,
      artist: artwork?.creators?.[0]?.address || "",
      edition: artwork.prints.supply || 0,
      total: artwork.prints.maxSupply || "Unlimited",
      description: artwork.description || "",
      owner: artwork.owner || "",
      price: artwork.price || 0,
      primarySaleAmount: artwork.primarySaleAmount || 0,
    };
  }, [artwork]);

  return {
    artworkSummary,
    isInitalLoadHappened,
    wallet,
    artwork,
    progress,
  };
}
