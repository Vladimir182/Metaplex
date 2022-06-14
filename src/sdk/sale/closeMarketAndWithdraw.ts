import {
  MarketArgs,
  MarketState,
  SellingResourceArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Wallet } from "@metaplex/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { IArt } from "state/artworks";
import { sendTransactions } from "../../utils/sendTransactions";
import { createWithdrawTransaction } from "./createWithdrawTransaction";
import { createClaimTransaction } from "./createClaimTransaction";
import { createCloseMarketTransaction } from "./createCloseMarketTransaction";

interface Props {
  connection: Connection;
  wallet: Wallet;
  metadata: PublicKey;
  market: PublicKey;
  state: MarketState;
  marketData: MarketArgs;
  artwork: IArt;
  store: PublicKey;
  sellingResourceData: SellingResourceArgs;
}

export const closeMarketAndWithdraw = async ({
  connection,
  wallet,
  metadata,
  market,
  state,
  marketData,
  artwork,
  store,
  sellingResourceData,
}: Props): Promise<void> => {
  const txs = [];

  if ([MarketState.Active, MarketState.Created].includes(state)) {
    const closeMarketTx = await createCloseMarketTransaction({
      market,
      connection,
      wallet,
    });
    txs.push(closeMarketTx);
  }

  const withdrawTx = await createWithdrawTransaction({
    connection,
    wallet,
    metadata,
    market,
    marketData,
    artwork,
  });
  txs.push(withdrawTx);

  const claimTx = await createClaimTransaction({
    connection,
    wallet,
    metadata,
    store,
    market,
    marketData,
    sellingResourceData,
  });
  txs.push(claimTx);

  await sendTransactions(connection, wallet, txs);
};
