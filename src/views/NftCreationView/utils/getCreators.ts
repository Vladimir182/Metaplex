import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { MetadataJsonCreator } from "sdk/createNft";

import { AddressRow } from "../interface";

export const getCreators = (
  wallet?: StringPublicKey | null,
  secondaryRoyalties?: AddressRow[]
): MetadataJsonCreator[] => {
  const storeOwner = !!wallet
    ? [
        {
          address: wallet,
          verified: true,
          share: 100,
        },
      ]
    : [];

  const hasOwnerInList = secondaryRoyalties?.some(
    ({ address }) => address === wallet
  );

  if (!secondaryRoyalties) {
    return storeOwner;
  }

  const [{ address }] = secondaryRoyalties;

  if (!address) {
    return storeOwner;
  }

  return [
    ...secondaryRoyalties,
    ...(!hasOwnerInList ? [{ ...storeOwner[0], share: 0 }] : []),
  ];
};
