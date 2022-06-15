import { attach, createEffect } from "effector";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { createMarket } from "sdk/createSale/createMarket";

import { IArt } from "state/artworks";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { $wallet } from "state/wallet";
import { loadMarket } from "sdk/loadMarkets";

import { waitForResponse } from "utils/waitForResponse";
import { solToLamports } from "utils/solToLamports";
import { toPubkey } from "utils/toPubkey";

import { FormState } from "../components/Form";

import { Source, Params, MarketSettings } from "./interface";

dayjs.extend(utc);

const DELAY_IN_SECONDS = 30;

export const createMarketFx = attach({
  effect: createEffect(
    async ({
      store,
      wallet,
      connection,
      updateProgress,
      saleDetails,
      artwork,
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

      const { market } = await createMarket({
        connection,
        wallet,
        store: toPubkey(store.storeId),
        resourceMint: toPubkey(artwork.mint),
        resourceToken: toPubkey(artwork.token),
        updateProgress,
        ...prepareSettings(saleDetails, artwork),
      });

      await waitForResponse(
        async () => await loadMarket({ connection, marketId: market })
      );
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

const prepareSettings = (data: FormState, artwork: IArt): MarketSettings => {
  const startDate = dayjs.utc(data.startDate).unix() + DELAY_IN_SECONDS;

  const piecesInOneWallet = data.piecesInOneWallet || null;

  const maxSupply = artwork.prints?.maxSupply
    ? artwork.prints.maxSupply - (artwork.prints.supply || 0)
    : null;

  return {
    name: "",
    description: "",
    mutable: true,
    price: solToLamports(Number(data.price)),
    piecesInOneWallet,
    startDate,
    endDate: null,
    maxSupply,
  };
};
