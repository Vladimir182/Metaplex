import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { Connection } from "@metaplex/js";
import { getStorage } from "utils/storage";
import { combine, createEffect, createEvent, restore, sample } from "effector";

export const NETWORK_KEY = "networkkey";
export const NETWORK_LIST: Cluster[] = ["devnet", "testnet", "mainnet-beta"];

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

sample({
  clock: $network,
  fn: (network) => ({ network }),
  target: setNetworkToStorageFx,
});

export const $connection = combine($network, (network) => {
  const endpoint =
    network === "mainnet-beta"
      ? "https://api.metaplex.solana.com/"
      : clusterApiUrl(network);
  return new Connection(endpoint);
});
