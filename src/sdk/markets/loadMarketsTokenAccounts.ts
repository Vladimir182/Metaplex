import { TokenAccount } from "@metaplex-foundation/mpl-core";
import { Connection } from "@solana/web3.js";

import { MarketSale } from "./types";

export const loadMarketsTokenAccounts = async ({
  connection,
  markets,
}: {
  connection: Connection;
  markets: MarketSale[];
}): Promise<TokenAccount[]> => {
  try {
    return await Promise.all(
      markets.map(
        async (market) => await TokenAccount.load(connection, market.refs.vault)
      )
    );
  } catch {
    return [];
  }
};
