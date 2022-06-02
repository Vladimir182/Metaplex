import { forward } from "effector";
import { useStore } from "effector-react";
import { useCallback } from "react";

import {
  $isInitalLoadHappened,
  $storeArtworks,
  fetchStoreArtworksFx,
} from "state/artworks";
import { $store } from "state/store";
import { IArt } from "state/artworks/types";

import { closeMarketFx } from "./effects/closeMarketFx";
import { $error } from "./store/error";
import { $progress, ActionType } from "./store/progress";
import { withdrawFx } from "./effects/withdrawFx";
import { claimFx } from "./effects/claimFx";

export function useLocalState() {
  const isInitalLoadHappened = useStore($isInitalLoadHappened);
  const artworks = useStore($storeArtworks);
  const form = useStore($store);
  const storeId = useStore($store.map((store) => store?.storeId));
  const progress = useStore($progress.$node);
  const error = useStore($error.map((error) => error?.error));

  forward({ from: closeMarketFx.fail, to: $error });
  forward({ from: withdrawFx.fail, to: $error });
  forward({ from: claimFx.fail, to: $error });

  const onCloseMarket = useCallback(
    async (market: string) => {
      try {
        $progress.set({ type: ActionType.CloseMarket, isVisible: true });

        await closeMarketFx({ market });
      } finally {
        await fetchStoreArtworksFx();
        $progress.set({ isVisible: false });
      }
    },
    [$progress, closeMarketFx, fetchStoreArtworksFx]
  );

  const onWithdraw = useCallback(
    async (params: { market: string; metadata: string; artwork: IArt }) => {
      try {
        $progress.set({ type: ActionType.Withdraw, isVisible: true });

        await withdrawFx(params);
      } finally {
        await fetchStoreArtworksFx();
        $progress.set({ isVisible: false });
      }
    },
    [$progress, withdrawFx, fetchStoreArtworksFx]
  );

  const onClaim = useCallback(
    async (params: {
      market: string;
      metadata: string;
      claimedImg: string;
    }) => {
      try {
        $progress.set({ type: ActionType.Claim, isVisible: true });

        await claimFx(params);
        $progress.set({ isVisible: false, claimedImg: params.claimedImg });
      } catch {
        $progress.set({ isVisible: false });
      } finally {
        await fetchStoreArtworksFx();
      }
    },
    [$progress, claimFx, fetchStoreArtworksFx]
  );

  return {
    error,
    form,
    storeId,
    artworks,
    isInitalLoadHappened,
    progress,
    onCloseMarket,
    onWithdraw,
    onClaim,
  };
}
