import { Wallet } from "@metaplex/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { IFixedPrice, isEndedSale } from "state/sales";
import { sendTransactions } from "utils/sendTransactions";
import { toPubkey } from "utils/toPubkey";

import { createClaimTransaction } from "../transactions/createClaimTransaction";
import { createCloseMarketTransaction } from "../transactions/createCloseMarketTransaction";
import { createWithdrawTransaction } from "../transactions/createWithdrawTransaction";

interface Props {
  connection: Connection;
  wallet: Wallet;
  sale: IFixedPrice;
  store: PublicKey;
}

export const closeMarketAndWithdraw = async ({
  connection,
  wallet,
  sale,
  store,
}: Props): Promise<void> => {
  const txs = [];

  if (!isEndedSale(sale)) {
    const closeMarketTx = await createCloseMarketTransaction({
      market: toPubkey(sale.id),
      connection,
      wallet,
    });
    txs.push(closeMarketTx);
  }

  const withdrawTx = await createWithdrawTransaction({
    connection,
    wallet,
    sale,
  });
  txs.push(withdrawTx);

  const claimTx = await createClaimTransaction({
    connection,
    wallet,
    store,
    sale,
  });
  txs.push(claimTx);

  await sendTransactions(connection, wallet, txs);
};
