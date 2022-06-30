import { StringPublicKey } from "@metaplex-foundation/mpl-core";

export interface AddressRow {
  address: StringPublicKey;
  verified: boolean;
  share: string;
  total?: string;
}

export interface FormData {
  preview: File | Record<string, never>;
  file: File | Record<string, never>;
  title: string;
  desc: string;
  supply: string;
  royalty: string;
  primaryRoyalties: Array<AddressRow>;
  secondaryRoyalties: Array<AddressRow>;
  attributes: Array<{ key: string; value: string }>;
  piecesInOneWallet: number;
}
