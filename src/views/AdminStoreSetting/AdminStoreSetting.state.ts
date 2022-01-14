import { StoreFormProps } from "components/forms/StoreCreateForm";
import { useStore } from "effector-react";
import { useCallback, useMemo } from "react";
import { EUploadProgress } from "sdk/uploadJson2Arweave";
import { loadStoreFx, $store, submitStoreFx } from "state/store";
import { createProgressTools } from "utils/createProgressTools";

type TState = EUploadProgress | null | "updateSettings";

function getContent(state: TState) {
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
    case "updateSettings":
      return {
        title: "Update Store configuration",
      };

    default:
      return {
        title: "",
        subtitle: "",
      };
  }
}

export function useLocalState({ storeId }: { storeId: string }) {
  const ref = useMemo(() => {
    const { $progressMeta, $progress } = createProgressTools(
      getContent,
      null as TState
    );

    return {
      $progressMeta,
      $progress,
    };
  }, []);

  const form = useStore($store);
  const progressMeta = useStore(ref.$progressMeta);

  const submitForm = useCallback(
    async (data: StoreFormProps) => {
      try {
        await submitStoreFx({
          data,
          updateProgress: (state) => ref.$progress.set(state),
        });
        ref.$progress.set("updateSettings");
        await loadStoreFx(storeId);
        ref.$progress.set(null);
      } catch (err) {
        ref.$progress.set(null);
        throw err;
      }
    },
    [storeId]
  );

  return { form, progressMeta, submitForm };
}
