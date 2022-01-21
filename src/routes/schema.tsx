import { ROUTES } from "routes";
import type { ISchema } from "./types";
import { HomePage } from "views/HomePage";
import { StoreCreate } from "views/StoreCreate";
import { NftCreationView } from "views/NftCreationView";
import { $hasConnectedWallet } from "state/wallet";
import { WalletNotConnected } from "views/routes/WalletNotConnected";

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
];
