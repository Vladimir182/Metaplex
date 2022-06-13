import { combine, restore } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { $connection } from "state/connection";
import { checkWalletStoreOriginFx } from "state/store";
import { $wallet } from "state/wallet";

const $data = restore(checkWalletStoreOriginFx.finally, null);

const $complex = combine(
  $data,
  checkWalletStoreOriginFx.pending,
  $connection,
  $wallet
);

export function useWalletStoreId() {
  const [data, pending, connection, wallet] = useStore($complex);

  useEffect(() => {
    if (data) {
      return;
    }
    if (connection && wallet && !pending) {
      checkWalletStoreOriginFx();
    }
  }, [connection, wallet, pending, data]);

  return [
    data?.status === "done" ? data.result : null,
    data?.status === "fail" ? data.error : null,
  ] as const;
}
