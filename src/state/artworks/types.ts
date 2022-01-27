/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MetaDataJsonCategory,
  MetadataJsonCreator,
  MetadataJsonFile,
} from "@metaplex/js";

export enum ArtType {
  Master = "Master",
  Print = "Print",
  NFT = "NFT",
}

export interface IArt {
  id: string;
  image: string;
  title: string;
  description?: string;
  creators: MetadataJsonCreator[];
  format: MetaDataJsonCategory;
  assets?: MetadataJsonFile[];
  type: ArtType;
  prints?: IPrintNumbers;
  price?: number; // TODO: remove price from artwork
  mint?: string;
  token?: string;
}

export interface IPrintNumbers {
  // current print number (ArtType is Print)
  edition?: number;
  // current amount of prints
  supply?: number;
  // maximum amount of prints (0 = unlimited)
  maxSupply?: number;
}

export const artHelpers = {
  getEditions(_: IArt) {
    return "-";
  },
  getPrice({ price }: IArt) {
    // TODO: implement
    return price || 0;
  },
  getAuthorName({ creators }: IArt) {
    // TODO: implement
    return creators.length ? creators[0].address : "";
  },
  getAuthorImg(_: IArt) {
    // TODO: ???
    return "";
  },
  getDate(_: IArt) {
    // TODO: ???
    return "";
  },
};

export type ArtworkCardVariant = "sell" | "buy" | "onSale" | "select";
