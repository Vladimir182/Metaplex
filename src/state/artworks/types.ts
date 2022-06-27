import {
  MetaDataJsonCategory,
  MetadataJsonCreator,
  MetadataJsonFile,
} from "@metaplex/js";
import { StringPublicKey } from "@metaplex-foundation/mpl-core";

export enum ArtType {
  Master = "Master",
  Print = "Print",
  NFT = "NFT",
}

export interface IArt {
  id: StringPublicKey;
  accountAddress: StringPublicKey;
  token: StringPublicKey;
  tokenAmount: number;
  mint: StringPublicKey;
  primarySaleHappened?: boolean;
  sellerFeeBasisPoints: number;
  image: string;
  title: string;
  description?: string;
  creators: MetadataJsonCreator[];
  format: MetaDataJsonCategory;
  assets?: MetadataJsonFile[];
  type: ArtType;
  prints?: IPrintNumbers;
  ownerAddress?: StringPublicKey;
}

export interface IPrintNumbers {
  // current print number (ArtType is Print)
  edition?: number;
  // current amount of prints
  supply?: number;
  // maximum amount of prints (0 = unlimited)
  maxSupply?: number;
}
