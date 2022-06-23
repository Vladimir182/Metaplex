import { ArweaveStorage, MetadataJson } from "@metaplex/js";
import { File } from "@web-std/file";
import { attach, createEffect, StoreValue } from "effector";
import { ENftProgress, mintArweaveNFT } from "sdk/createNft/mintArveaweNFT";

import { AddressRow } from "../components/forms/NftCreate/helper";

import { $connection, $network } from "./connection";
import { $wallet } from "./wallet";

export const ARWEAVE_UPLOAD_ENDPOINT =
  "https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile";

export const $storage = $network.map(
  (env) =>
    new ArweaveStorage({
      endpoint: ARWEAVE_UPLOAD_ENDPOINT,
      env,
    })
);

export interface IMintArweaveParams {
  file: File;
  metadata: MetadataJson;
  primaryRoyalties: AddressRow[];
  maxSupply: number;
  updateProgress?: (status: ENftProgress | null) => void;
  WebFile?: typeof File;
}

export interface IMintArweaveSource {
  connection: StoreValue<typeof $connection>;
  storage: StoreValue<typeof $storage>;
  wallet: StoreValue<typeof $wallet>;
}

export type IMintArweaveParamsWithSource = IMintArweaveParams &
  IMintArweaveSource;

export const mintArweaveFx = attach({
  effect: createEffect(
    ({
      file,
      metadata,
      maxSupply,
      updateProgress,
      connection,
      storage,
      wallet,
      WebFile = File,
      primaryRoyalties,
    }: IMintArweaveParamsWithSource) => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      return mintArweaveNFT(
        {
          connection,
          wallet,
          file,
          metadata,
          maxSupply,
          storage,
          updateProgress,
          primaryRoyalties,
        },
        WebFile
      );
    }
  ),
  source: {
    connection: $connection,
    storage: $storage,
    wallet: $wallet,
  },
  mapParams: (params: IMintArweaveParams, source: IMintArweaveSource) => {
    return { ...source, ...params };
  },
});
