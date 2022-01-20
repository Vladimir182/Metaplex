import { Link } from "@chakra-ui/react";
import { StoreCreateForm } from "components/forms/StoreCreateForm";
import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { StorefrontExists } from "components/modals/StorefrontExists";
import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { useLocalState } from "./StoreCreate.state";

function goToSuccessPage(storeId: string, navigate: NavigateFunction) {
  navigate(
    ROUTES.tokens({
      ":storeId": storeId,
    })
  );
}

export const StoreCreate: React.FC = () => {
  const navigate = useNavigate();
  const { onSubmit, store, hasStore, progressMeta } = useLocalState({
    goToSuccessPage,
    navigate,
  });

  const onClose = useCallback(() => {
    navigate(ROUTES.home());
  }, []);

  return (
    <Layout narrow>
      <StoreCreateForm
        onSubmit={onSubmit}
        title="Create your storefront"
        actionButtonName="Create Storefront"
        disabled={hasStore !== false} // we allow work with form only we can't load store config for wallet
      >
        <>
          No technical setup or coding required. Takes less than 5 minutes.
          <Link href="#"> Learn more</Link>
        </>
      </StoreCreateForm>
      {store && (
        <StorefrontExists
          isOpen
          storeName={store.name}
          logoUri={store.logoImg}
          storeId={store.storeId}
          onClose={onClose}
        />
      )}

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
    </Layout>
  );
};
