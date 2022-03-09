import {
  Cluster,
  clusterApiUrl,
  Connection,
  PerfSample,
} from "@solana/web3.js";

export enum ConnectionStatus {
  "stable",
  "unstable",
}

export type NetworksStatus = Array<{
  network: Cluster;
  status: ConnectionStatus;
}>;

const getPerformance = async (connection: Connection) => {
  const samples: PerfSample[] = await connection.getRecentPerformanceSamples(
    720
  );

  const samplesSumm: number = samples.reduce(
    (acc, elem) => (acc += elem.numTransactions),
    0
  );

  return samplesSumm / samples.length > samples[0].numTransactions
    ? ConnectionStatus.stable
    : ConnectionStatus.unstable;
};

export const getNetworksStatus = async (networks: Cluster[]) => {
  const result: NetworksStatus = [];

  for (const network of networks) {
    const connection = new Connection(clusterApiUrl(network));
    const status = await getPerformance(connection);
    result.push({ network, status });
  }

  return result;
};
