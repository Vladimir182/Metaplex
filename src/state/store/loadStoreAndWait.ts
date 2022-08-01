import { attach, createEffect, StoreValue } from "effector";
import { loadStore } from "sdk/loadStore";
import { $connection } from "state/connection";

import { $wallet } from "../wallet";

export interface ILoadStoreAndWaitSource {
  wallet: StoreValue<typeof $wallet>;
  connection: StoreValue<typeof $connection>;
}

export const loadStoreAndWaitFx = attach({
  effect: createEffect(
    async ({ wallet, connection }: ILoadStoreAndWaitSource) => {
      if (!wallet) return;
      return loadStore({ owner: wallet?.publicKey, connection });
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
  },
});
