import { useMemo } from "react";
import type { NavigateFunction } from "react-router-dom";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { createEffect } from "effector";
import { useEvent, useStore } from "effector-react";
import { ETransactionProgress } from "enums/transactionProgress";
import {
  loadStoreFx,
  setShowStoreCongratulations,
  submitStoreFx,
} from "state/store";
import { createProgressTools } from "utils/createProgressTools";
import { waitForResponse } from "utils/waitForResponse";

import { loadStoreAndWaitFx } from "../../state/store/loadStoreAndWait";

import { StoreFormProps } from "./components/Form";

export interface IOptions {
  navigate: NavigateFunction;
  goToSuccessPage(navigate: NavigateFunction): void;
}

function getContent(state: ETransactionProgress | null) {
  switch (state) {
    case ETransactionProgress.creating_transaction:
      return {
        title: "Creating Transaction",
      };
    case ETransactionProgress.signing_transaction:
      return {
        title: "Signing Creation Transaction",
        subtitle: "Approve the transaction from your wallet",
      };
    case ETransactionProgress.sending_transaction_to_solana:
      return {
        title: "Sending Transaction to Solana",
        subtitle: "This will take a few seconds",
      };
    case ETransactionProgress.waiting_for_final_confirmation:
      return {
        title: "Waiting for Final Confirmation",
        subtitle: "",
      };
    case ETransactionProgress.loading_store:
      return {
        title: "Loading Store",
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
    null as ETransactionProgress | null
  );
  const submitFx = createEffect(async (data: StoreFormProps) => {
    try {
      await submitStoreFx({
        data,
        updateProgress: (state) => $progress.set(state),
      });
      $progress.set(ETransactionProgress.loading_store);
      await waitForResponse(loadStoreAndWaitFx);
      await loadStoreFx();
    } catch (e) {
      if (e instanceof WalletSignTransactionError) {
        $progress.set(null);
      }

      // TODO: Introduce error logging
      return;
    }

    setShowStoreCongratulations(true);
    goToSuccessPage(navigate);
  });

  return {
    submitFx,
    $progressMeta,
  };
}

export const useLocalState = (opts: IOptions) => {
  const state = useMemo(() => createLocalState(opts), []);
  const progressMeta = useStore(state.$progressMeta);
  const onSubmit = useEvent(state.submitFx);

  return {
    onSubmit,
    progressMeta,
  };
};
