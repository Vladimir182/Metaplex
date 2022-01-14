import { Coingecko, Currency } from "@metaplex/js";
import { createEffect } from "effector";
import { preload } from "./utils";

const provider = new Coingecko();

export const fetchRateSolToUsdFx = createEffect(() =>
  provider.getRate(Currency.SOL, Currency.USD)
);

export const preloadSolToUsdRate = preload(fetchRateSolToUsdFx);

export const $solToUsdRate = preloadSolToUsdRate.$node.map(([rate]) => rate);
