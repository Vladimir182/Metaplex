import { useStore } from "effector-react";
import { useMemo } from "react";
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  restore,
} from "effector";
import { modelFactory } from "effector-factorio";
import { AnyPublicKey } from "@metaplex-foundation/mpl-core";

import { createProgressTools } from "utils/createProgressTools";
import { CreateSaleSidebarEnum } from "views/CreateSaleView/components/CreateSaleSidebar";
import { ETransactionProgress } from "enums/transactionProgress";

import { $storeArtworks } from "state/artworks";

import { FormState } from "../components/Form";
import { getContent } from "../utils/getContent";

import { createMarketFx } from "./createMarketFx";

interface ModelDefaults {
  itemId?: AnyPublicKey;
}

export const createSaleFactory = modelFactory((defaults: ModelDefaults) => {
  const { $progressMeta, $progress } = createProgressTools(
    getContent,
    null as ETransactionProgress | null
  );

  const setStep = createEvent<CreateSaleSidebarEnum>();
  const $step = restore(setStep, CreateSaleSidebarEnum.CONFIGURE);

  const artworks = useStore($storeArtworks);

  const setIsFormValid = createEvent<boolean>();
  const $isFormValid = restore(setIsFormValid, false);
  const triggerValidation = createEvent();
  const formSubmitFx = createEffect();
  const formSubmit = createEvent<FormState>();
  const $saleDetails = createStore<FormState | null>(null);
  forward({
    from: formSubmit,
    to: $saleDetails,
  });

  guard({
    clock: setStep,
    filter: $step.map((step) => step === CreateSaleSidebarEnum.PREVIEW),
    target: formSubmitFx,
  });

  const artwork = useMemo(
    () => artworks.find(({ id }) => id === defaults.itemId),
    [artworks, defaults.itemId]
  );

  const artworkSummary = useMemo(() => {
    if (!artwork?.prints) {
      return null;
    }

    return {
      img: artwork.image,
      title: artwork.title,
      artist: "",
      edition: artwork.prints.supply || 0,
      total: artwork.prints.maxSupply || "Unlimited",
    };
  }, [artwork]);

  const createSaleFx = attach({
    effect: createMarketFx,
    source: {
      saleDetails: $saleDetails,
    },
    mapParams: (_, { saleDetails }) => {
      if (!artwork || !saleDetails) {
        throw new Error("create sale: missed artwork or settings");
      }

      return {
        artwork,
        saleDetails,
        updateProgress: (state) => $progress.set(state),
      };
    },
  });
  const $createdSale = restore(createMarketFx.doneData, null);

  const reviewSubmit = createEvent();
  forward({ from: reviewSubmit, to: createSaleFx });

  const $error = restore(createMarketFx.failData, null);
  const onCloseModal = createEvent();
  $error.reset(onCloseModal);

  return {
    $step,
    $progressMeta,
    $saleDetails,
    $error,
    $isFormValid,
    $createdSale,

    setStep,
    setIsFormValid,
    triggerValidation,
    formSubmitFx,
    formSubmit,
    reviewSubmit,
    onCloseModal,

    artwork,
    artworkSummary,
  };
});
