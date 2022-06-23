import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import { chunks } from "utils/chunks";
import { excludesFalsy } from "utils/excludeFalsy";

const KEYS_PER_REQUEST = 99;

export const getMultipleAccounts = async (
  connection: Connection,
  keys: PublicKey[],
  commitment: Commitment
) => {
  const result = await Promise.all(
    chunks(keys, KEYS_PER_REQUEST).map((chunk) =>
      connection.getMultipleAccountsInfo(chunk, commitment)
    )
  );

  return result.flat().filter(excludesFalsy);
};
