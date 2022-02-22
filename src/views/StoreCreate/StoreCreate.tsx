import { Center, Link } from "@chakra-ui/react";
import { StoreCreateForm } from "components/forms/StoreCreateForm";
import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { loadStoreFx } from "state/store";
import { useLocalState as useLocalStateHome } from "views/HomePage/HomePage.state";
import { useLocalState } from "./StoreCreate.state";

function goToSuccessPage(navigate: NavigateFunction) {
  navigate(ROUTES.home());
}

export const StoreCreate: React.FC = () => {
  const { storeId, pendingStore } = useLocalStateHome();

  const navigate = useNavigate();

  useEffect(() => {
    loadStoreFx();
  }, []);

  const { onSubmit, progressMeta } = useLocalState({
    goToSuccessPage,
    navigate,
  });

  if (pendingStore) {
    return (
      <Center width="full">
        <LoaderComponent title="loading store" darkBg />
      </Center>
    );
  }

  if (storeId) {
    navigate(ROUTES.home());
  }

  return (
    <Layout narrow>
      <StoreCreateForm
        onSubmit={onSubmit}
        title="Create your store"
        actionButtonName="Create Store"
      >
        <>
          No technical setup or coding required. Takes less than 5 minutes.
          <Link href="#"> Learn more</Link>
        </>
      </StoreCreateForm>

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
    </Layout>
  );
};
