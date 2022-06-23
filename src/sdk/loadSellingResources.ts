import { TokenAccount } from "@metaplex-foundation/mpl-core";
import {
  MarketArgs,
  SellingResource,
  SellingResourceArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";

import { getMultipleAccounts } from "./getMultipleAccounts";

export const loadSellingResources = async ({
  markets,
  connection,
}: {
  markets: Map<string, MarketArgs>;
  connection: Connection;
}): Promise<Map<string, SellingResourceArgs>> => {
  const { keys, accounts } = await getSellingResourcesFromMarkets(
    markets,
    connection
  );

  return accounts.reduce<Map<string, SellingResourceArgs>>(
    (map, acc, index) => {
      map.set(keys[index].toBase58(), SellingResource.deserialize(acc.data)[0]);
      return map;
    },
    new Map<string, SellingResourceArgs>()
  );
};

const getSellingResourcesFromMarkets = async (
  markets: Map<string, MarketArgs>,
  connection: Connection
) => {
  // get needed selling resources keys from markets
  const keys = Array.from(markets).map(([, market]) => market.sellingResource);

  // use multiple accounts load to optimize loading
  const accounts = await getMultipleAccounts(connection, keys, "finalized");

  return { keys, accounts };
};

export const loadSellingResourcesTokenAccounts = async ({
  connection,
  sellingResources,
}: {
  connection: Connection;
  sellingResources: Map<string, SellingResourceArgs>;
}): Promise<TokenAccount[]> => {
  try {
    return await Promise.all(
      Array.from(sellingResources).map(
        async ([, resource]) =>
          await TokenAccount.load(connection, resource.vault)
      )
    );
  } catch {
    return [];
  }
};
