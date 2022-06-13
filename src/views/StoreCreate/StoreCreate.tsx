import { Center } from "@chakra-ui/react";
import { StoreCreateForm } from "components/forms/StoreCreateForm";
import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { useLocalState as useLocalStateHome } from "views/HomePage/HomePage.state";
import { useLocalState } from "./StoreCreate.state";

function goToSuccessPage(navigate: NavigateFunction) {
  navigate(ROUTES.home());
}

export const StoreCreate: React.FC = () => {
  const { store, pending } = useLocalStateHome();

  const navigate = useNavigate();

  const { onSubmit, progressMeta } = useLocalState({
    goToSuccessPage,
    navigate,
  });

  if (pending) {
    return (
      <Center width="full">
        <LoaderComponent title="loading store" darkBg />
      </Center>
    );
  }

  if (store) {
    navigate(ROUTES.home());
  }

  return (
    <Layout narrow>
      <StoreCreateForm
        onSubmit={onSubmit}
        title="Create your store"
        actionButtonName="Create Store"
      >
        <>No technical setup or coding required. Takes less than 5 minutes.</>
      </StoreCreateForm>

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
    </Layout>
  );
};
