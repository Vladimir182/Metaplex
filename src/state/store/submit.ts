import { attach, createEffect, sample, StoreValue } from "effector";
import { ETransactionProgress } from "enums/transactionProgress";
import { $walletAddress } from "state/wallet";
import { StoreFormProps } from "views/StoreCreate/components/Form";

import { initStoreFx } from "./init";
import { loadStoreFx } from "./store";

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

sample({ clock: submitStoreFx.done, target: loadStoreFx });
