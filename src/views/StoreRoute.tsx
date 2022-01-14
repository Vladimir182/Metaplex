import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { loadStoreFx } from "state/store";

export const StoreRoute: React.FC = () => {
  const { storeId } = useParams();

  useEffect(() => {
    if (storeId) {
      loadStoreFx(storeId);
    }
  }, [storeId]);

  return <Outlet />;
};
