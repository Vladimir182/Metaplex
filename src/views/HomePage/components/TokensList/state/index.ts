import { useCallback } from "react";
import { createEvent, forward } from "effector";
import { useStore } from "effector-react";
import {
  $isInitalLoadHappened,
  $profileArtworks,
  fetchProfileArtworksFx,
} from "state/artworks";
import { $sales, fetchSalesFx, IFixedPrice } from "state/sales";
import { $store } from "state/store";

import { closeMarketAndWithdrawFx } from "./effects/closeMarketAndWithdrawFx";
import { $error } from "./store/error";
import { $progress, ActionType } from "./store/progress";

export function useLocalState() {
  const isInitalLoadHappened = useStore($isInitalLoadHappened);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));
  const progress = useStore($progress.$node);
  const error = useStore($error.map((error) => error?.error));

  forward({ from: closeMarketAndWithdrawFx.fail, to: $error });

  const onWithdraw = useCallback(
    async (sale: IFixedPrice) => {
      try {
        $progress.set({ type: ActionType.Withdraw, isVisible: true });

        await closeMarketAndWithdrawFx({ sale });
      } catch (e) {
        $progress.set({ isVisible: false });
      } finally {
        await fetchProfileArtworksFx();
        await fetchSalesFx();
        $progress.set({ isVisible: false });
      }
    },
    [$progress, closeMarketAndWithdrawFx, fetchProfileArtworksFx]
  );

  const resetError = createEvent();
  $error.reset(resetError);

  return {
    $sales,
    $profileArtworks,
    error,
    resetError,
    form,
    storeId,
    isInitalLoadHappened,
    progress,
    onWithdraw,
  };
}
