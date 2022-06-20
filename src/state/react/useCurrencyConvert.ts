import { useStore } from "effector-react";
import { useCallback, useEffect } from "react";
import { $solToUsdRate } from "state/currency";
import { fetchRatesFx } from "state/currency";

export const useCurrencyConvert = () => {
  const rate = useStore($solToUsdRate);

  useEffect(() => {
    rate ?? fetchRatesFx();
  }, [rate]);

  const convert = useCallback(
    (sol: number | null) => (!sol || !rate ? null : sol * rate),
    [rate]
  );
  return convert;
};
