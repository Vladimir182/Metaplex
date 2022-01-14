import { useStoreMap } from "effector-react";
import { useCallback } from "react";
import { IArt } from "state/artworks";
import { $storeArtworks } from "state/artworks";
import { submitInstantSaleFx } from "state/instant-sale";

export function transform(ret: IArt) {
  return {
    image: ret.image,
    title: ret.title,
    details: ret.description ?? "",
    artists: ret.creators.map(({ address }) => ({
      id: address,
      address,
    })),
    stats: { edition: 1, available: 12, total: 25 }, // TODO: ????
    tags: [] as string[], // TODO: ????
    prints: ret.prints,
    walletTransaction: {
      sol: 0.01,
      usd: 120,
    }, // TODO: ????
  };
}

export function useLocalState(itemId?: string, defaultArtwork?: IArt) {
  const artwork = useStoreMap($storeArtworks, (list) => {
    const ret = list.find((it) => it.id === itemId) ?? defaultArtwork;
    if (!ret) {
      return;
    }
    return transform(ret);
  });

  const onSubmitInstantSale = useCallback((price: number, endDate: Date) => {
    submitInstantSaleFx({ price, endDate });
  }, []);

  return { artwork, onSubmitInstantSale };
}
