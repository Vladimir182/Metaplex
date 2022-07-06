import { StringPublicKey } from "@metaplex-foundation/mpl-core";

export type MetaDataJsonCategory = "image" | "video" | "audio" | "vr" | "html";

export interface MetadataJsonAttribute {
  trait_type: string;
  value: string;
}

export interface MetadataJsonCollection {
  name: string;
  family: string;
}

export interface MetadataJsonFile {
  uri: string;
  type: string;
  cdn?: boolean;
}

export interface MetadataJsonCreator {
  address: StringPublicKey;
  share: number;
}

export interface MetadataJsonProperties {
  files: MetadataJsonFile[];
  category: MetaDataJsonCategory;
  creators: MetadataJsonCreator[];
}

export interface MetadataJson {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  animation_url?: string;
  external_url?: string;
  attributes?: MetadataJsonAttribute[];
  collection?: MetadataJsonCollection;
  properties: MetadataJsonProperties;
}

export interface ArweaveUploadResult {
  error?: string;
  messages?: {
    filename: string;
    status: "success" | "fail";
    transactionId?: string;
    error?: string;
  }[];
}
