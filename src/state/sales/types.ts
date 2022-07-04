import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { MetadataJsonCreator } from "sdk/createNft";
import { IArt } from "state/artworks";

export type UnixTimestamp = number;

export enum SaleState {
  Uninitialized = 0,
  Created = 1,
  Suspended = 2,
  Active = 3,
  SoldOut = 4,
  Ended = 5,
}

export interface ISaleFPGate {
  collection: StringPublicKey;
  expireOnUse: boolean;
  gatingTime?: number; // date
}

export interface ISaleBase {
  id: StringPublicKey;
  artwork: IArt;
  state: SaleState;
  endDate?: UnixTimestamp;
}

/**
 * Instant sale via FixedPriceSale
 */
export interface IFixedPrice extends ISaleBase {
  price: number;
  startDate: UnixTimestamp;
  piecesInOneWallet?: number;
  maxSupply?: number;
  earnings?: number;
  gate?: ISaleFPGate;
  isWithdrawn?: boolean;
  primaryCreators: MetadataJsonCreator[];
  refs: {
    sellingResource: StringPublicKey;
    treasuryHolder: StringPublicKey;
    treasuryMint: StringPublicKey;
    vault: StringPublicKey;
    resource: StringPublicKey;
    seller: StringPublicKey;
  };
}
