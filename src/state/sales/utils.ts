import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import dayjs from "dayjs";

import { IArt } from "../artworks";

import { IFixedPrice } from "./types";

export function isSale(sale: IFixedPrice | IArt): sale is IFixedPrice {
  return (sale as IFixedPrice).artwork !== undefined;
}

export function isEndedSale(sale: IFixedPrice): boolean {
  const { endDate } = sale;
  const now = dayjs().unix();
  const isEnded = endDate ? endDate < now : false;

  return (
    isEnded ||
    sale.state === MarketState.Ended ||
    sale.state === MarketState.Suspended ||
    false
  );
}
