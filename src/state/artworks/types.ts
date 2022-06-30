import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import {
  MetaDataJsonCategory,
  MetadataJsonCreator,
  MetadataJsonFile,
} from "sdk/createNft";

export enum ArtType {
  Master = "Master",
  Print = "Print",
  NFT = "NFT",
}

export interface IArtCreator extends MetadataJsonCreator {
  verified: boolean;
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
  creators: IArtCreator[];
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
