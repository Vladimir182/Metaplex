import { createEffect, restore } from "effector";

import { getRate } from "./getRate";
import { Currency } from "./types";

export const fetchRatesFx = createEffect(async () => {
  return (await getRate(Currency.SOL, Currency.USD))[0].rate;
});

export const $solToUsdRate = restore(fetchRatesFx.doneData, null);
