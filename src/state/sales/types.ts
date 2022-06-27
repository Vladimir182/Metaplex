import { MetadataJsonCreator } from "@metaplex/js";
import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import { IArt } from "state/artworks";

export type UnixTimestamp = number;

export interface ISaleFPGate {
  collection: StringPublicKey;
  expireOnUse: boolean;
  gatingTime?: number; // date
}

export interface ISaleBase {
  id: StringPublicKey;
  artwork: IArt;
  state: MarketState;
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
