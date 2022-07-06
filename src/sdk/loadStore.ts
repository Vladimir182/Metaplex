import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import {
  FixedPriceSaleProgram,
  Store,
  StoreArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import { IStore } from "state/store";
import { trim } from "utils/trim";

import { findAccountsAndDeserialize } from "./share";

const discriminator = base58.encode(
  Uint8Array.from([130, 48, 247, 244, 182, 191, 30, 26])
);

const getStores = async (
  owner: PublicKey,
  connection: Connection
): Promise<StoreArgs & { storeId: string }> => {
  const storesAndKeys = await findAccountsAndDeserialize(
    connection,
    FixedPriceSaleProgram,
    Store,
    [
      { offset: 0, bytes: discriminator },
      { offset: 8, bytes: owner.toBase58() },
    ]
  );

  return Array.from(storesAndKeys).map(([pubkey, store]) =>
    combineStore(store, pubkey)
  )[0];
};

const combineStore = (data: Store, pubkey: AnyPublicKey) => ({
  ...data,
  name: trim(data.name),
  description: trim(data.description),
  storeId: pubkey.toString(),
});

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
