import { useStoreMap } from "effector-react";
import { ComponentProps, FC } from "react";
import { ROUTES } from "routes";
import { $store } from "state/store";
import { NotFoundView } from "views/NotFoundView";

export const AppNoAccess: FC = ({ children }) => {
  const props = useStoreMap($store, (store) => {
    if (store) {
      const ret: ComponentProps<typeof NotFoundView> = {
        href: ROUTES.store({ ":storeId": store.storeId }),
        hrefTitle: "Open personal store",
      };
      return ret;
    }
    return;
  });

  return <NotFoundView {...props}>{children || "Access denied"}</NotFoundView>;
};
