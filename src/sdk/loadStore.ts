import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { Store, StoreConfig } from "@metaplex-foundation/mpl-metaplex";
import { Connection } from "@solana/web3.js";
import { IStore, IStoreConfig } from "state/store";
import { loadExtraContent } from "./loadExtraContent";

export const loadStore = async ({
  connection,
  storeAddress,
}: {
  connection: Connection;
  storeAddress: AnyPublicKey;
}): Promise<IStore | null> => {
  const storeAccount = await Store.load(connection, storeAddress);
  if (!storeAccount.data) {
    return null;
  }

  try {
    const configId = await StoreConfig.getPDA(storeAddress);
    const configAccount = await StoreConfig.load(connection, configId);
    const {
      data: { settingsUri },
    } = configAccount;

    if (!settingsUri) {
      return null;
    }

    const config = await loadExtraContent<IStoreConfig>(settingsUri);

    return {
      ...config,
      storeId: storeAccount.pubkey.toString(),
    };
  } catch {
    return null;
  }
};
