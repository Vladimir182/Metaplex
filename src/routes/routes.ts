import { route, routeFromRoot, variable } from "utils/route";

export const storeID = variable(":storeId");
export const itemID = variable(":itemId");

const store = route(storeID);
const storeFrom = routeFromRoot(store);
const admin = storeFrom("admin");
const adminFrom = routeFromRoot(admin);

export const ROUTES = {
  home: route(""),
  createStore: route("store", "create"),
  profile: route("profile"),
  store,
  createNft: storeFrom("nft", "create"),
  admin,
  adminHome: adminFrom(""),
  adminStorefront: adminFrom("storefront"),
  adminListings: adminFrom("listings"),
  adminItems: adminFrom("items"),
  item: route(itemID, "item"),
  tokens: storeFrom("tokens"),
} as const;
