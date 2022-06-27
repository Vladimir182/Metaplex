import { useMemo } from "react";
import { useStore } from "effector-react";
import { $isInitalLoadHappened, $profileArtworks } from "state/artworks";
import { $sales } from "state/sales";
import { $wallet } from "state/wallet";
import { $progress } from "views/HomePage/components/TokensList/state/store/progress";

export function useLocalState({
  itemId,
  saleId,
}: {
  itemId?: string;
  saleId?: string;
}) {
  const artworks = useStore($profileArtworks);
  const sales = useStore($sales);
  const isInitalLoadHappened = useStore($isInitalLoadHappened);
  const wallet = useStore($wallet);
  const progress = useStore($progress.$node);

  const sale = useMemo(() => sales.find(({ id }) => id === saleId), [sales]);

  const artwork = useMemo(() => {
    if (sale) {
      return sale.artwork;
    }
    return artworks.find(({ accountAddress }) => accountAddress === itemId);
  }, [artworks, itemId, saleId]);

  return {
    sale,
    artwork,
    isInitalLoadHappened,
    wallet,
    progress,
  };
}
