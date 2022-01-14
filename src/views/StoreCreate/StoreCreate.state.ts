import { StoreFormProps } from "components/forms/StoreCreateForm";
import { createEffect, attach } from "effector";
import { useEvent, useStore } from "effector-react";
import { useMemo } from "react";
import type { NavigateFunction } from "react-router-dom";
import { EUploadProgress } from "sdk/uploadJson2Arweave";
import { createProgressTools } from "utils/createProgressTools";
import {
  submitStoreFx,
  setShowStoreCongratulations,
  $walletStoreId,
  loadStoreByAddressFx,
} from "state/store";
import { usePreload } from "state/react/usePreload";
import { preload } from "state/utils";

export interface IOptions {
  navigate: NavigateFunction;
  goToSuccessPage(name: string, navigate: NavigateFunction): void;
}

function getContent(state: EUploadProgress | null) {
  switch (state) {
    case EUploadProgress.minting:
      return {
        title: "Minting",
        subtitle: "Starting Mint Process",
      };
    case EUploadProgress.preparing_assets:
      return {
        title: "Preparing Assets",
        subtitle: "",
      };
    case EUploadProgress.signing_metadata_transaction:
      return {
        title: "Signing Metadata Transaction",
        subtitle: "Approve the transaction from your wallet",
      };
    case EUploadProgress.sending_transaction_to_solana:
      return {
        title: "Sending Transaction to Solana",
        subtitle: "This will take a few seconds",
      };
    case EUploadProgress.waiting_for_initial_confirmation:
      return {
        title: "Waiting for Initial Confirmation",
        subtitle: "",
      };
    case EUploadProgress.waiting_for_final_confirmation:
      return {
        title: "Waiting for Final Confirmation",
        subtitle: "",
      };
    case EUploadProgress.uploading_to_arweave:
      return {
        title: "Uploading to Arweave",
        subtitle: "",
      };

    default:
      return {
        title: "",
        subtitle: "",
      };
  }
}

function createLocalState({ goToSuccessPage, navigate }: IOptions) {
  const { $progressMeta, $progress } = createProgressTools(
    getContent,
    null as EUploadProgress | null
  );
  const submitFx = createEffect(async (data: StoreFormProps) => {
    const { storeId } = await submitStoreFx({
      data,
      updateProgress: (state) => $progress.set(state),
    });
    if (!storeId) {
      throw new Error("Fail to create store");
    }
    setShowStoreCongratulations(true);
    goToSuccessPage(storeId.toString(), navigate);
  });

  const loadWalletStoreFx = attach({
    effect: ({ walletStoreId }) => {
      if (!walletStoreId) {
        throw new Error("walletStoreId hasn't been setup");
      }
      return loadStoreByAddressFx(walletStoreId);
    },
    source: {
      walletStoreId: $walletStoreId,
    },
  });

  const preloadWalletStoreFx = preload(loadWalletStoreFx);

  return {
    preloadWalletStoreFx,
    submitFx,
    $progressMeta,
  };
}

export const useLocalState = (opts: IOptions) => {
  const state = useMemo(() => createLocalState(opts), []);
  const progressMeta = useStore(state.$progressMeta);
  const onSubmit = useEvent(state.submitFx);

  const { data, fail } = usePreload(state.preloadWalletStoreFx);

  return {
    store: data,
    hasStore: data ? true : fail ? false : null,
    onSubmit,
    progressMeta,
  };
};
