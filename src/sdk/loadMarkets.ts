import {
  Market,
  MarketArgs,
  FixedPriceSaleProgram,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";

const MARKET_DATA_SIZE = 395;

const getMarkets = async (
  store: string,
  connection: Connection
): Promise<Map<string, MarketArgs>> => {
  const marketAccounts = await FixedPriceSaleProgram.getProgramAccounts(
    connection,
    {
      filters: [
        {
          dataSize: MARKET_DATA_SIZE,
        },
        // Filter for assigned to this store
        {
          memcmp: {
            offset: 8,
            bytes: store,
          },
        },
      ],
    }
  );

  return marketAccounts.flat().reduce<Map<string, MarketArgs>>((prev, acc) => {
    if (acc?.info?.data) {
      prev.set(acc.pubkey.toBase58(), Market.deserialize(acc.info.data)[0]);
    }
    return prev;
  }, new Map<string, MarketArgs>());
};

export const loadMarkets = async ({
  store,
  connection,
}: {
  store: string;
  connection: Connection;
}): Promise<Map<string, MarketArgs>> => {
  try {
    return getMarkets(store, connection);
  } catch {
    return new Map();
  }
};
