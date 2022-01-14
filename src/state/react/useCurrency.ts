import { Currency } from "@metaplex/js";
import { useCallback } from "react";
import { preloadSolToUsdRate } from "state/solToUsd";
import { convertCurrency } from "utils/convertCurrency";
import { usePreload } from "./usePreload";

export const useSolToUsd = () => {
  const { data, fail, effectFx } = usePreload(preloadSolToUsdRate);

  const convert = useCallback(
    (sol: number | null) =>
      convertCurrency(sol, data, Currency.SOL, Currency.USD),
    [data]
  );
  return { convert, fail, fetch: effectFx };
};
