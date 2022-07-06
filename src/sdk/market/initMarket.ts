import { bignum, COption } from "@metaplex-foundation/beet";
import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { Connection } from "@solana/web3.js";
import { ETransactionProgress } from "enums/transactionProgress";
import { sendTransactions } from "sdk/transactions";
import { toPubkey } from "utils/toPubkey";
import { Wallet } from "wallet";

import { createMarket } from "./actions/createMarket";
import { MarketSettings } from "./actions/createMarket/transactions/createMarketTransaction";

export interface InitMarketProps {
  connection: Connection;
  wallet: Wallet;
  store: AnyPublicKey;
  resourceMint: AnyPublicKey;
  resourceToken: AnyPublicKey;
  marketSettings: MarketSettings;
  maxSupply: COption<bignum>;
  updateProgress?: (status: ETransactionProgress | null) => void;
}

export const initMarket = async (params: InitMarketProps) => {
  const { connection, wallet, updateProgress } = params;

  updateProgress?.(ETransactionProgress.creating_transaction);
  const { store, resourceMint, resourceToken } = params;
  const { market, txs } = await createMarket({
    ...params,
    store: toPubkey(store),
    resourceMint: toPubkey(resourceMint),
    resourceToken: toPubkey(resourceToken),
  });

  updateProgress?.(ETransactionProgress.sending_transaction_to_solana);
  await sendTransactions(connection, wallet, txs);

  return { market: market.publicKey.toString() };
};
