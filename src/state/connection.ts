import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";
import { interval } from "patronum";
import { getStorage } from "utils/storage";

import {
  getNetworksStatus,
  NetworksStatus,
} from "components/modals/UserProfile/NetworkSelector/utils/getNetworksStatus";

export const NETWORK_KEY = "networkkey";
export const NETWORK_LIST: Cluster[] = ["devnet", "testnet", "mainnet-beta"];
export const DEFAULT_TIMEOUT = 180_000; // 3 minutes

export function getSavedNetwork(
  defaultValue?: Cluster,
  storage = getStorage()
): Cluster {
  const data = storage?.getItem(NETWORK_KEY);
  if (data && NETWORK_LIST.includes(data as Cluster)) {
    return data as Cluster;
  }
  return (
    defaultValue ??
    (process.env.NODE_ENV === "production" ? "mainnet-beta" : "devnet")
  );
}

export const networkChange = createEvent<Cluster>();
export const $network = restore(networkChange, getSavedNetwork());
export const $networkStatus = createStore<null | NetworksStatus>(null);
export const setNetworkToStorageFx = createEffect(
  ({
    storage = getStorage(),
    network,
  }: {
    storage?: Storage | null;
    network: Cluster;
  }) => {
    storage?.setItem(NETWORK_KEY, network);
  }
);

export const startStatusCheck = createEvent();
export const stopStatusCheck = createEvent();

const { tick } = interval({
  timeout: 100000,
  start: startStatusCheck,
  stop: stopStatusCheck,
});

export const calcNetworkStatusFx = createEffect(async () => {
  return await getNetworksStatus(NETWORK_LIST);
});

sample({
  clock: $network,
  fn: (network) => ({ network }),
  target: setNetworkToStorageFx,
});

export const $connection = combine($network, (network) => {
  const endpoint =
    network === "mainnet-beta"
      ? "https://api.metaplex.solana.com/"
      : network === "devnet"
      ? "https://liquid.devnet.rpcpool.com/5ebea512d12be102f53d319dafc8/"
      : clusterApiUrl(network);

  return new Connection(endpoint);
});

forward({ from: [tick, startStatusCheck], to: calcNetworkStatusFx });
forward({ from: calcNetworkStatusFx.doneData, to: $networkStatus });
