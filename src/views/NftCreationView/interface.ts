import { StringPublicKey } from "@metaplex-foundation/mpl-core";

export interface AddressRow {
  address: StringPublicKey;
  verified: boolean;
  share: string;
  total?: string;
}
