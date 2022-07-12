import { Market } from "@metaplex-foundation/mpl-fixed-price-sale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { attach, createEffect } from "effector";
import { MarketSettings } from "sdk/market/actions/createMarket/transactions/createMarketTransaction";
import { initMarket } from "sdk/market/initMarket";
import { loadAccountAndDeserialize } from "sdk/share";
import { fetchProfileArtworksFx } from "state/artworks";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { $wallet } from "state/wallet";
import { solToLamports } from "utils/solToLamports";
import { toPubkey } from "utils/toPubkey";
import { waitForResponse } from "utils/waitForResponse";

import { FormState } from "../components/Form";

import { Params, Source } from "./interface";

dayjs.extend(utc);

const DELAY_IN_SECONDS = 30;

export const createMarketFx = attach({
  effect: createEffect(
    async ({
      store,
      wallet,
      connection,
      saleDetails,
      artwork,
      updateProgress,
    }: Source & Params) => {
      if (
        !wallet ||
        !store ||
        !artwork.mint ||
        !artwork.token ||
        !artwork.prints
      ) {
        return;
      }

      const maxSupply = artwork.prints?.maxSupply
        ? artwork.prints.maxSupply - (artwork.prints.supply || 0)
        : null;

      const { market } = await initMarket({
        connection,
        wallet,
        maxSupply,
        updateProgress,
        store: toPubkey(store.storeId),
        resourceMint: toPubkey(artwork.mint),
        resourceToken: toPubkey(artwork.token),
        marketSettings: prepareSettings(saleDetails),
      });

      await waitForResponse(
        async () =>
          await loadAccountAndDeserialize(connection, Market, toPubkey(market))
      );
      await fetchProfileArtworksFx();
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
  },
  mapParams: ({ updateProgress, saleDetails, artwork }: Params, sources) => ({
    ...sources,
    updateProgress,
    saleDetails,
    artwork,
  }),
});

const prepareSettings = (data: FormState): MarketSettings => {
  const startDate = dayjs.utc(data.startDate).unix() + DELAY_IN_SECONDS;

  const piecesInOneWallet = data.piecesInOneWallet || null;

  return {
    name: "",
    description: "",
    mutable: true,
    price: solToLamports(Number(data.price)),
    piecesInOneWallet,
    startDate,
    endDate: null,
  };
};
