import { IFixedPrice } from "state/sales";

export type MarketSale = Omit<IFixedPrice, "artwork" | "primaryCreators">;
