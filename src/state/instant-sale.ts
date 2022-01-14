import { actions } from "@metaplex/js";
import { PublicKey } from "@solana/web3.js";
import { attach, createEffect, StoreValue } from "effector";
import { $connection } from "./connection";
import { $store } from "./store";
import { $wallet } from "./wallet";

export const submitInstantSaleSourceFx = createEffect(
  async ({
    connection,
    wallet,
    store,
  }: {
    price: number;
    endDate: Date;
    connection: StoreValue<typeof $connection>;
    wallet: StoreValue<typeof $wallet>;
    store: StoreValue<typeof $store>;
  }) => {
    if (!wallet) {
      throw new Error("Empty wallet");
    }

    if (!store) {
      throw new Error("Empty store");
    }

    // TODO: implement me
    const auction: PublicKey | null = null;
    if (!auction) {
      throw new Error("auction not implemented");
    }

    const result = await actions.instantSale({
      connection,
      wallet,
      store: new PublicKey(store.storeId),
      auction,
    });
    return result;
  }
);

export const submitInstantSaleFx = attach({
  effect: submitInstantSaleSourceFx,
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
  },
  mapParams(
    params: {
      price: number;
      endDate: Date;
    },
    source
  ) {
    return { ...params, ...source };
  },
});
