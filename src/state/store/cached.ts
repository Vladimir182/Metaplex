import { Cluster, PublicKey } from "@solana/web3.js";
import { attach, Effect } from "effector";
import { composeKey, readCacheFx, writeCacheFx } from "state/cache";
import { $network } from "state/connection";
import { key2String } from "utils/base";

import { IStore } from "./store";

const getKey = (owner?: string, network?: Cluster) =>
  composeKey([network, "store", owner]);

export const readCachedStoreFx = attach({
  effect: readCacheFx,
  source: { network: $network },
  mapParams: (owner: PublicKey, { network }) => ({
    key: getKey(key2String(owner), network),
  }),
}) as Effect<PublicKey, IStore | null>;

export const writeCachedStoreFx = attach({
  effect: writeCacheFx,
  source: { network: $network },
  mapParams: (value: IStore | null, { network }) => {
    return {
      value: { ...value, admin: key2String(value?.admin) },
      key: getKey(key2String(value?.admin), network),
    };
  },
});
