import { FC, useCallback } from "react";
import { MainView, TMenuTypes } from "components/MainSidebar/MainView";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { $store } from "state/store";
import { Layout } from "components/Layout";
import { ROUTES } from "routes";
import { useStoreMap } from "effector-react";

export const AdminView: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const storeId = useStoreMap($store, (store) => store?.storeId);
  const handleEnterResources = useCallback(
    (state: TMenuTypes) => {
      if (storeId) {
        switch (state) {
          case "listing":
            navigate(
              ROUTES.adminListings({
                ":storeId": storeId,
              })
            );
            break;
          case "items":
            navigate(
              ROUTES.adminItems({
                ":storeId": storeId,
              })
            );
            break;
          case "storefront":
            navigate(
              ROUTES.adminStorefront({
                ":storeId": storeId,
              })
            );
            break;
          default:
            break;
        }
      }
    },
    [navigate]
  );

  const sidebar = <MainView onOpen={handleEnterResources} />;

  return (
    // TODO: Replace the hack for narrow layout content with a more proper/reliable code
    <Layout sidebarContent={sidebar} narrow={pathname.includes("storefront")}>
      <Outlet />
    </Layout>
  );
};
