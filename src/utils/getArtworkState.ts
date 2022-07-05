import { IArt } from "state/artworks";
import { SaleState } from "state/sales";

export const getArtworkState = (artwork: IArt) => {
  return artwork.prints?.supply === artwork.prints?.maxSupply
    ? SaleState.SoldOut
    : SaleState.Uninitialized;
};
