import { ROUTES } from "routes";
import type { ISchema } from "./types";
import { HomePage } from "views/HomePage";
import { StoreCreate } from "views/StoreCreate";
import { NftCreationView } from "views/NftCreationView";
import { $hasConnectedWallet } from "state/wallet";
import { WalletNotConnected } from "views/routes/WalletNotConnected";
import { CreateSaleView } from "views/CreateSaleView/CreateSaleView";
import { TokenDetails } from "views/TokenDetails/TokenDetails";

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
  { path: ROUTES.tokenDetails, view: TokenDetails },
];
