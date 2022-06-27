import { Connection, PublicKey } from "@solana/web3.js";
import { chunks } from "utils/chunks";

import { ApplyChunkFn } from ".";

export const getMultipleAccounts = (
  connection: Connection,
  addresses: PublicKey[],
  fn: ApplyChunkFn,
  pageSize?: number
) => {
  const addressGroups = chunks(addresses, pageSize);
  return Promise.all(
    addressGroups.map(async (addresses) => {
      fn(await connection.getMultipleAccountsInfo(addresses), addresses);
    })
  );
};
