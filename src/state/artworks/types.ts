/* eslint-disable @typescript-eslint/no-unused-vars */
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/types";
import {
  MetaDataJsonCategory,
  MetadataJsonCreator,
  MetadataJsonFile,
} from "@metaplex/js";
import dayjs from "dayjs";

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
  primarySaleAmount?: number;
  mint?: string;
  token?: string;
  state?: MarketState;
  endDate?: dayjs.Dayjs;
  market?: string;
  isWithdrawn?: boolean;
}

export interface IPrintNumbers {
  // current print number (ArtType is Print)
  edition?: number;
  // current amount of prints
  supply?: number;
  // maximum amount of prints (0 = unlimited)
  maxSupply?: number;
}

export type ArtworkCardVariant = "sell" | "buy" | "onSale" | "select";
