import { useCallback } from "react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import { createEvent, forward } from "effector";
import { useStore } from "effector-react";
import {
  $isInitalLoadHappened,
  $storeArtworks,
  fetchStoreArtworksFx,
} from "state/artworks";
import { IArt } from "state/artworks/types";
import { $store } from "state/store";

import { closeMarketAndWithdrawFx } from "./effects/closeMarketAndWithdrawFx";
import { $error } from "./store/error";
import { $progress, ActionType } from "./store/progress";

export function useLocalState() {
  const isInitalLoadHappened = useStore($isInitalLoadHappened);
  const artworks = useStore($storeArtworks);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));
  const progress = useStore($progress.$node);
  const error = useStore($error.map((error) => error?.error));

  forward({ from: closeMarketAndWithdrawFx.fail, to: $error });

  const onWithdraw = useCallback(
    async (params: {
      market: string;
      metadata: string;
      artwork: IArt;
      claimedImg: string;
      state: MarketState;
    }) => {
      try {
        $progress.set({ type: ActionType.Withdraw, isVisible: true });

        await closeMarketAndWithdrawFx(params);
      } catch (e) {
        $progress.set({ isVisible: false });
      } finally {
        await fetchStoreArtworksFx();
        $progress.set({ isVisible: false });
      }
    },
    [$progress, closeMarketAndWithdrawFx, fetchStoreArtworksFx]
  );

  const resetError = createEvent();
  $error.reset(resetError);

  return {
    error,
    resetError,
    form,
    storeId,
    artworks,
    isInitalLoadHappened,
    progress,
    onWithdraw,
  };
}
