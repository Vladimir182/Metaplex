import { Connection } from "@solana/web3.js";
import { sleep } from "./sleep";

const SLEEP_TIMEOUT = 300;
const REQUEST_TIMEOUT = 20000;

export const fetchConfirmation = async (
  connection: Connection,
  txId: string
) => {
  let rpcResponse = null;
  const startTime = +new Date();

  while (!rpcResponse && +new Date() - startTime < REQUEST_TIMEOUT) {
    try {
      rpcResponse = await connection.confirmTransaction(txId, "finalized");
    } catch {}

    await sleep(SLEEP_TIMEOUT);
  }

  return rpcResponse;
};
