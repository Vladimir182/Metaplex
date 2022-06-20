import { useMemo } from "react";

import { useCurrencyConvert } from "./useCurrencyConvert";

export const useSolToUsd = (sol?: number | null) => {
  const convert = useCurrencyConvert();

  const usd = useMemo(() => (sol && convert(sol)) || null, [convert, sol]);

  return usd;
};
