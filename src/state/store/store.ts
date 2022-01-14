import { attach, createEffect, StoreValue, restore } from "effector";
import { loadStore } from "sdk/loadStore";
import { $connection } from "state/connection";
import { IStoreConfig } from "./types";

export type IStore = IStoreConfig & {
  storeId: string;
};

export const loadStoreByAddressFx = attach({
  effect: createEffect(
    ({
      connection,
      storeAddress,
    }: {
      storeAddress: string;
      connection: StoreValue<typeof $connection>;
    }) => loadStore({ connection, storeAddress })
  ),
  source: {
    connection: $connection,
  },
  mapParams(storeAddress: string, { connection }) {
    return { storeAddress, connection };
  },
});

export const loadStoreFx = attach({
  effect: createEffect(
    async ({
      connection,
      storeId,
    }: {
      connection: StoreValue<typeof $connection>;
      storeId: string;
    }) => {
      if (!storeId) {
        throw new Error("storeId wasn't defined");
      }
      return await loadStore({ connection, storeAddress: storeId });
    }
  ),
  source: {
    connection: $connection,
  },
  mapParams: (storeId: string, { connection }) => ({
    storeId,
    connection,
  }),
});

export const $store = restore(loadStoreFx.doneData, null);

export const $hasStore = restore(
  loadStoreFx.finally.map((state) => (!state ? null : state.status === "done")),
  null
);
