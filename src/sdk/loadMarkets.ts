import {
  MarketAccountData,
  MarketAccountDataArgs,
  FixedPriceSaleProgram,
  SellingResourceAccountDataArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";

const getMarkets = async (
  sellingResources: Map<string, SellingResourceAccountDataArgs>,
  connection: Connection
): Promise<Map<string, MarketAccountDataArgs>> => {
  // ToDo: Load markets by store
  const marketAccounts = await Promise.all(
    Array.from(sellingResources).map(([sellingResource]) =>
      FixedPriceSaleProgram.getProgramAccounts(connection, {
        filters: [
          {
            memcmp: {
              offset: 40,
              bytes: sellingResource,
            },
          },
        ],
      })
    )
  );

  return marketAccounts
    .flat()
    .reduce<Map<string, MarketAccountDataArgs>>((prev, acc) => {
      prev.set(
        acc.pubkey.toBase58(),
        MarketAccountData.deserialize(acc.info.data)[0]
      );
      return prev;
    }, new Map<string, MarketAccountDataArgs>());
};

export const loadMarkets = async ({
  sellingResources,
  connection,
}: {
  sellingResources: Map<string, SellingResourceAccountDataArgs>;
  connection: Connection;
}): Promise<Map<string, MarketAccountDataArgs>> => {
  try {
    return getMarkets(sellingResources, connection);
  } catch {
    return new Map();
  }
};
