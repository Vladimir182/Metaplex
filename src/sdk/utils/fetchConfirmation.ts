import { Connection } from "@solana/web3.js";
import { REQUEST_TIMEOUT, SLEEP_TIMEOUT, sleep } from ".";

export const fetchConfirmation = async (
  connection: Connection,
  txId: string
) => {
  let rpcResponse = null;
  const startTime = +new Date();

  while (!rpcResponse && +new Date() - startTime < REQUEST_TIMEOUT) {
    try {
      rpcResponse = await connection.confirmTransaction(txId, "max");
    } catch {}

    await sleep(SLEEP_TIMEOUT);
  }

  return rpcResponse;
};
