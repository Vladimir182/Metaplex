import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { attach, createEffect, StoreValue } from "effector";
import { ENftProgress, MetadataJson, mintArweaveNFT } from "sdk/createNft";
import { loadAccountAndDeserialize } from "sdk/share";
import { $wallet } from "state/wallet";
import { toPubkey } from "utils/toPubkey";
import { waitForResponse } from "utils/waitForResponse";
import { AddressRow } from "views/NftCreationView";

import { $connection, $network } from "../connection";

export interface IMintArweaveParams {
  file: File;
  metadata: MetadataJson;
  maxSupply: number | null;
  updateProgress?: (status: ENftProgress | null) => void;
  primaryRoyalties: AddressRow[];
}

export interface IMintArweaveSource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  network: StoreValue<typeof $network>;
}

export type IMintArweaveParamsWithSource = IMintArweaveParams &
  IMintArweaveSource;

export const mintArweaveFx = attach({
  effect: createEffect(
    async ({
      file,
      metadata,
      maxSupply,
      updateProgress,
      connection,
      network,
      wallet,
      primaryRoyalties,
    }: IMintArweaveParamsWithSource) => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const nft = await mintArweaveNFT({
        connection,
        wallet,
        file,
        metadata,
        maxSupply,
        network,
        updateProgress,
        primaryRoyalties,
      });

      await waitForResponse(
        async () =>
          await loadAccountAndDeserialize(
            connection,
            Metadata,
            toPubkey(nft.metadata)
          )
      );

      return nft;
    }
  ),
  source: {
    connection: $connection,
    network: $network,
    wallet: $wallet,
  },
  mapParams: (params: IMintArweaveParams, source: IMintArweaveSource) => {
    return { ...source, ...params };
  },
});
