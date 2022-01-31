import { StoreFormProps } from "components/forms/StoreCreateForm";
import { attach, createEffect, StoreValue } from "effector";
import { ETransactionProgress } from "enums/transactionProgress";
import { $walletAddress } from "state/wallet";
import { initStoreFx } from "./init";

export interface ISubmitProps {
  updateProgress: (status: ETransactionProgress | null) => void;
  data: StoreFormProps;
}

export const submitStoreFx = attach({
  effect: createEffect(
    async ({
      data,
      updateProgress,
      walletAddress,
    }: ISubmitProps & {
      walletAddress: StoreValue<typeof $walletAddress>;
    }) => {
      if (!walletAddress) {
        throw new Error(`Wallet wasn't connected`);
      }

      const result = await initStoreFx({
        name: data.name,
        updateProgress,
      });

      return result;
    }
  ),
  source: {
    walletAddress: $walletAddress,
  },
  mapParams({ data, updateProgress }: ISubmitProps, { walletAddress }) {
    return { data, updateProgress, walletAddress };
  },
});
