import { Commitment, Connection, TransactionSignature } from "@solana/web3.js";
import dayjs from "dayjs";
import { DEFAULT_TIMEOUT } from "state/connection";
import { sleep } from "utils/sleep";

export async function waitConfirmation(
  connection: Connection,
  rawTx: Buffer,
  txId: string,
  commitment?: Commitment
) {
  const stop = resendTransaction(connection, rawTx);

  const error = await getTransactionStatus(txId, connection, commitment);
  stop();
  return error;
}

function resendTransaction(connection: Connection, rawTx: Buffer) {
  const startTime = dayjs().unix();
  const endTime = startTime + DEFAULT_TIMEOUT;

  let done = false;

  (async () => {
    await sleep(500);
    while (!done && dayjs().unix() < endTime) {
      connection.sendRawTransaction(rawTx, { skipPreflight: true });
      await sleep(1000);
    }
  })();

  return () => {
    done = true;
  };
}

async function getTransactionStatus(
  signature: TransactionSignature,
  connection: Connection,
  commitment: Commitment = "confirmed"
) {
  try {
    const response = await connection.confirmTransaction(signature, commitment);
    return response.value.err;
  } catch (e) {
    return e as Error;
  }
}
