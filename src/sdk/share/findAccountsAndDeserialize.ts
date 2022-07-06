import { Program } from "@metaplex-foundation/mpl-core";
import { Connection, DataSizeFilter, MemcmpFilter } from "@solana/web3.js";

import { Deserializable } from "./types";

type FindFilter = MemcmpFilter["memcmp"] | DataSizeFilter;

const isDataSizeFilter = (filter: FindFilter): filter is DataSizeFilter =>
  (filter as DataSizeFilter).dataSize !== undefined;

export async function findAccountsAndDeserialize<T>(
  connection: Connection,
  programClass: typeof Program,
  dataClass: Deserializable<T>,
  filters: FindFilter[]
) {
  const config = {
    filters: filters.map((f) => (isDataSizeFilter(f) ? f : { memcmp: f })),
  };
  const accounts = await programClass.getProgramAccounts(connection, config);

  return accounts.reduce(
    (map, { pubkey, info }) =>
      info
        ? map.set(pubkey.toString(), dataClass.deserialize(info.data)[0])
        : map,
    new Map<string, T>()
  );
}
