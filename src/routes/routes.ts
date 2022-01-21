import { route, variable } from "utils/route";

export const storeID = variable(":storeId");
export const itemID = variable(":itemId");

export const ROUTES = {
  home: route(""),
  createStore: route("store", "create"),
  createNft: route("nft", "create"),
} as const;
