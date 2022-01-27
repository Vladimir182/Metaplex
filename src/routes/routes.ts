import { route, variable } from "utils/route";

export const itemID = variable(":itemId");

export const ROUTES = {
  home: route(""),
  createStore: route("store", "create"),
  createNft: route("nft", "create"),
  createSale: route("sale", "create", itemID),
} as const;
