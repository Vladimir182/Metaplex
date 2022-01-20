import { StoreFormProps } from "components/forms/StoreCreateForm";
import { createEffect } from "effector";
import { useEvent, useStore } from "effector-react";
import { useMemo } from "react";
import type { NavigateFunction } from "react-router-dom";
import { EUploadProgress } from "sdk/uploadJson2Arweave";
import { createProgressTools } from "utils/createProgressTools";
import { submitStoreFx, setShowStoreCongratulations } from "state/store";

export interface IOptions {
  navigate: NavigateFunction;
  goToSuccessPage(navigate: NavigateFunction): void;
}

function getContent(state: EUploadProgress | null) {
  switch (state) {
    case EUploadProgress.signing_metadata_transaction:
      return {
        title: "Signing Creation Transaction",
        subtitle: "Approve the transaction from your wallet",
      };
    case EUploadProgress.sending_transaction_to_solana:
      return {
        title: "Sending Transaction to Solana",
        subtitle: "This will take a few seconds",
      };
    case EUploadProgress.waiting_for_final_confirmation:
      return {
        title: "Waiting for Final Confirmation",
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
