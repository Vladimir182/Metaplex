import { StringPublicKey } from "@metaplex-foundation/mpl-core";

export interface AddressRow {
  address: StringPublicKey;
  share: number;
  total?: number;
  isOwner?: boolean;
}

export interface FormData {
  file: File;
  title: string;
  desc: string;
  supply: string;
  royalty: string;
  primaryRoyalties: Array<AddressRow>;
  secondaryRoyalties: Array<AddressRow>;
  attributes: Array<{ key: string; value: string }>;
  piecesInOneWallet: number;
}
