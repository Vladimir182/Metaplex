import { route, variable } from "utils/route";

export const itemID = variable(":itemId");
export const saleID = variable(":saleId");

export const ROUTES = {
  home: route(""),
  createStore: route("store", "create"),
  createNft: route("nft", "create"),
  createSale: route("sale", "create", itemID),
  itemDetails: route("item", itemID),
  saleDetails: route("sale", saleID),
} as const;
