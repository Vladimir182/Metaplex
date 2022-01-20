import {
  MembershipTokenProgram,
  StoreAccountData,
  StoreAccountDataArgs,
} from "@metaplex-foundation/mpl-membership-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { IStore } from "state/store";

const getStores = async (
  owner: PublicKey,
  connection: Connection
): Promise<StoreAccountDataArgs & { storeId: string }> => {
  const storeAccounts = await MembershipTokenProgram.getProgramAccounts(
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
  );

  const stores = storeAccounts.map((account) => ({
    ...StoreAccountData.fromAccountInfo(account.info)[0],
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
