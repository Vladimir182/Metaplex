import { TokenAccount } from "@metaplex-foundation/mpl-core";
import {
  FixedPriceSaleProgram,
  SellingResourceAccountData,
  SellingResourceAccountDataArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";

const getSellingResources = async (
  store: string,
  connection: Connection
): Promise<Map<string, SellingResourceAccountDataArgs>> => {
  // ToDo: use multiple accounts load by using selling resource accounts from markets
  // Should improve loading speed
  const sellingResourcesAccounts =
    await FixedPriceSaleProgram.getProgramAccounts(connection, {
      filters: [
        {
          dataSize: 186,
        },
        // Filter for assigned to this store
        {
          memcmp: {
            offset: 8,
            bytes: store,
          },
        },
      ],
    });

  return sellingResourcesAccounts.reduce<
    Map<string, SellingResourceAccountDataArgs>
  >((prev, acc) => {
    prev.set(
      acc.pubkey.toBase58(),
      SellingResourceAccountData.deserialize(acc.info.data)[0]
    );
    return prev;
  }, new Map<string, SellingResourceAccountDataArgs>());
};

export const loadSellingResources = async ({
  store,
  connection,
}: {
  store: string;
  connection: Connection;
}): Promise<Map<string, SellingResourceAccountDataArgs>> => {
  return getSellingResources(store, connection);
};

export const loadSellingResourcesTokenAccounts = async ({
  connection,
  sellingResources,
}: {
  connection: Connection;
  sellingResources: Map<string, SellingResourceAccountDataArgs>;
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
