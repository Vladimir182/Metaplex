import { preloadWalletBalance } from "state/wallet";
import { usePreload } from "./usePreload";
import { useSolToUsd } from "./useCurrency";

export const useBalance = () => {
  const { data, fail, effectFx } = usePreload(preloadWalletBalance);

  const { convert } = useSolToUsd();
  const balance =
    data === null
      ? null
      : {
          sol: data,
          usd: convert(data) ?? 0,
        };
  return { balance, fail, fetch: effectFx };
};
