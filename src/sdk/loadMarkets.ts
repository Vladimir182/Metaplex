import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import {
  Market,
  MarketArgs,
  FixedPriceSaleProgram,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";
import { toPubkey } from "../utils/toPubkey";

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

export const loadMarket = async ({
  connection,
  marketId,
}: {
  connection: Connection;
  marketId: AnyPublicKey;
}): Promise<Market | undefined> => {
  const info = await connection.getAccountInfo(toPubkey(marketId));
  if (info) {
    return Market.deserialize(info.data)[0];
  }
};
