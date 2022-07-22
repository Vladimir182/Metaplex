import { Cluster } from "@solana/web3.js";
import { attach, Effect, StoreValue } from "effector";
import { composeKey, readCacheFx, writeCacheFx } from "state/cache";
import { $network } from "state/connection";
import { $store } from "state/store";

import { $wallet } from "../wallet";

import { IArt } from "./types";

const getKey = (network: Cluster, wallet: StoreValue<typeof $wallet>) =>
  composeKey(
    [network, "artworks", wallet?.publicKey.toBase58()].filter((v) => !!v)
  );

export const readCachedArtsFx = attach({
  effect: readCacheFx,
  source: { network: $network, store: $store, wallet: $wallet },
  mapParams: (_: unknown, { network, wallet }) => ({
    key: getKey(network, wallet),
  }),
}) as Effect<void, IArt[]>;

export const writeCachedArtsFx = attach({
  effect: writeCacheFx,
  source: { network: $network, wallet: $wallet },
  mapParams: (value: IArt[], { network, wallet }) => ({
    value,
    key: getKey(network, wallet),
  }),
});
