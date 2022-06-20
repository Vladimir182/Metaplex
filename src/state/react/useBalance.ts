import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  $walletBalance,
  startBalancePolling,
  stopBalancePolling,
  updateWalletBalanceFx,
} from "state/balance";

export const useBalance = () => {
  const sol = useStore($walletBalance);

  useEffect(() => {
    startBalancePolling();

    return () => {
      stopBalancePolling();
    };
  }, []);

  const balance = sol === null ? null : { sol };
  return { balance, fetch: updateWalletBalanceFx };
};
