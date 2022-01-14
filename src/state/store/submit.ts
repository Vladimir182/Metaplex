import { StoreFormProps } from "components/forms/StoreCreateForm";
import { attach, createEffect, StoreValue } from "effector";
import { EUploadProgress } from "sdk/uploadJson2Arweave";
import { $walletAddress } from "state/wallet";
import { IStoreConfig } from "./types";
import { initStoreFx } from "./init";

export function convertStoreFormPropsToIStoreConfig(
  data: StoreFormProps,
  walletAddress: string
) {
  const json: IStoreConfig = {
    name: data.name,
    description: data.description || "",
    link: data.link || "",
    logoImg:
      data.logoImg instanceof File ? data.logoImg.name : data.logoImg || "",
    coverImg:
      data.coverImg instanceof File ? data.coverImg.name : data.coverImg || "",
    owner: walletAddress,
  };
  const files = [data.logoImg, data.coverImg].filter(
    (f) => f instanceof File
  ) as File[];
  return { json, files };
}

export interface ISubmitProps {
  updateProgress?: (status: EUploadProgress | null) => void;
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

      const { json, files } = convertStoreFormPropsToIStoreConfig(
        data,
        walletAddress
      );

      const result = await initStoreFx({
        json,
        files,
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
