import { PublicKey } from "@solana/web3.js";
import { attach, createEffect, StoreValue } from "effector";
import { loadStore } from "sdk/loadStore";
import { $connection } from "state/connection";

export const loadStoreByOwnerFx = attach({
  effect: createEffect(
    ({
      connection,
      owner,
    }: {
      connection: StoreValue<typeof $connection>;
      owner: PublicKey;
    }) => loadStore({ owner, connection })
  ),
  source: {
    connection: $connection,
  },
  mapParams(owner: PublicKey, { connection }) {
    return { owner, connection };
  },
});
