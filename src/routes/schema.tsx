import { ROUTES } from "routes";
import type { ISchema } from "./types";
import { HomePage } from "views/HomePage";
import { StoreCreate } from "views/StoreCreate";
import { ProfileItemsView } from "views/ProfileItemsView";
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
  {
    path: ROUTES.profile,
    guard: $hasConnectedWallet,
    guardView: WalletNotConnected,
    view: ProfileItemsView,
  },
  // {
  //   path: ROUTES.store,
  //   view: StoreRoute,
  //   subroute: [
  //     {
  //       index: true,
  //       guard: $hasStore,
  //       guardView: NotFoundView,
  //       view: StorePage,
  //     },
  //     {
  //       path: ROUTES.admin,
  //       view: AdminView,
  //       guard: $isStoreAdmin,
  //       subroute: [
  //         {
  //           path: ROUTES.adminHome,
  //           view: () => {
  //             const { storeId } = useParams();
  //             const path = storeId
  //               ? ROUTES.adminStorefront({
  //                   ":storeId": storeId,
  //                 })
  //               : ROUTES.home();
  //             return <Redirect to={path} replace />;
  //           },
  //         },
  //         { path: ROUTES.adminStorefront, view: AdminStoreSetting },
  //         { path: ROUTES.adminListings, view: AdminListing },
  //         { path: ROUTES.adminItems, view: AdminItems },
  //       ],
  //     },
  //     {
  //       path: ROUTES.item,
  //       view: () => <ItemView variant="buy" notFound={<NotFoundView />} />,
  //     },
  //     { path: ROUTES.tokens, view: TokensList },
  //     { path: "*", view: NotFoundView },
  //   ],
  // },
];
