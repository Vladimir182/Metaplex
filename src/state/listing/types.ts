import { AuctionState } from "@metaplex-foundation/mpl-auction";
import { IArt } from "state/artworks";

export interface AuctionRefs {
  acceptPayment: string;
  auction: string;
  vault: string;
  manager: string;
  authority: string;
}

export interface InstantSale {
  artwork: IArt;
  price: number;
  status: AuctionState;
  endedAt?: number;
  refs: AuctionRefs;
}

// will be extended with other types of Auctions
export type Listing = InstantSale;
