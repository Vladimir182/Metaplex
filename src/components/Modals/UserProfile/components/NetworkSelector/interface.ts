import type { Cluster } from "@solana/web3.js";

export interface NetworkSelectorProps {
  networks: Cluster[];
  currentNetwork: Cluster;
  setNetwork(network: Cluster): void;
}
