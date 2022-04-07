import { Account } from "@metaplex-foundation/mpl-core";
import {
  FixedPriceSaleProgram,
  Store,
  StoreArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection, PublicKey } from "@solana/web3.js";
import { IStore } from "state/store";

const getStores = async (
  owner: PublicKey,
  connection: Connection
): Promise<StoreArgs & { storeId: string }> => {
  const storeAccounts = (await FixedPriceSaleProgram.getProgramAccounts(
    connection,
    {
      filters: [
        // Filter for assigned to this store
        {
          memcmp: {
            offset: 8,
            bytes: owner.toBase58(),
          },
        },
      ],
    }
  )) as Account<Store>[];

  const stores = storeAccounts.map((account) => ({
    ...Store.fromAccountInfo(account.info)[0],
    storeId: account.pubkey.toString(),
  }));

  return stores[0];
};

export const loadStore = async ({
  owner,
  connection,
}: {
  owner: PublicKey;
  connection: Connection;
}): Promise<null | IStore> => {
  try {
    return getStores(owner, connection);
  } catch {
    return null;
  }
};
