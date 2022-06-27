import { ROUTES } from "routes";
import { $hasConnectedWallet } from "state/wallet";
import { CreateSaleView } from "views/CreateSaleView/CreateSaleView";
import { HomePage } from "views/HomePage";
import { ItemView } from "views/ItemView";
import { NftCreationView } from "views/NftCreationView";
import { WalletNotConnected } from "views/routes/WalletNotConnected";
import { StoreCreate } from "views/StoreCreate";

import type { ISchema } from "./types";

export const SCHEMA: ISchema[] = [
  {
    path: ROUTES.home,
    view: HomePage,
    guard: $hasConnectedWallet,
    guardView: WalletNotConnected,
  },
  {
    path: ROUTES.createStore,
    view: StoreCreate,
    guard: $hasConnectedWallet,
    guardView: WalletNotConnected,
  },
  { path: ROUTES.createNft, view: NftCreationView },
  { path: ROUTES.createSale, view: CreateSaleView },
  { path: ROUTES.itemDetails, view: ItemView },
  { path: ROUTES.saleDetails, view: ItemView },
];
