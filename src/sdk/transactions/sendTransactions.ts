import { Transaction } from "@metaplex-foundation/mpl-core";
import {
  Connection,
  TransactionError,
  TransactionSignature,
} from "@solana/web3.js";
import { log } from "debug";
import { Wallet } from "wallet";

import { prepareTransactions } from "./prepareTransactions";
import { throwTransactionError } from "./throwTransactionError";
import { TransactionsBatch } from "./TransactionsBatch";
import { waitConfirmation } from "./waitConfirmation";

export async function sendTransactions(
  connection: Connection,
  wallet: Wallet,
  txs: (Transaction | TransactionsBatch | undefined)[],
  retry = 1
) {
  const txIds: TransactionSignature[] = [];
  let error: TransactionError | Error | null | undefined;

  const latestBlockhash = await connection.getLatestBlockhash();
  const options = {
    feePayer: wallet.publicKey,
    recentBlockhash: latestBlockhash.blockhash,
  };
  const unsignedTxns = prepareTransactions(txs, options);

  if (!unsignedTxns.length) {
    log(`nothing to send`);
    return txIds;
  }

  const signedTxns = await wallet.signAllTransactions(unsignedTxns);

  for (let index = 0; index < signedTxns.length; index++) {
    const tx = signedTxns[index];
    const rawTx = tx.serialize();
    const txId = await connection.sendRawTransaction(rawTx, {
      skipPreflight: true,
    });

    log(`sending tx [${index + 1}/${signedTxns.length}]: ${txId}`);

    error = await waitConfirmation(connection, rawTx, txId);
    if (error) {
      log(`transaction ${txId} failed`);

      if (
        retry &&
        (error as Error).name === "TransactionExpiredBlockheightExceededError"
      ) {
        log("blockhash expired, retry");

        const nextTxIds = await sendTransactions(
          connection,
          wallet,
          signedTxns.slice(index),
          retry - 1
        );
        txIds.push(...nextTxIds);
        break;
      }

      throwTransactionError(txId, error);
    }
    txIds.push(txId);
  }

  log("transactions confirmed");
  return txIds;
}
