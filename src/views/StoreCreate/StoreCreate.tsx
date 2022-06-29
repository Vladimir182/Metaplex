import { NavigateFunction, useNavigate } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { ROUTES } from "routes";
import { useLocalState as useLocalStateHome } from "views/HomePage/HomePage.state";

import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/Modals/InfiniteProgress";
import { LoaderComponent } from "components/Modals/InfiniteProgress/LoaderComponent";

import { Form } from "./components/Form";
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
      <Form
        onSubmit={onSubmit}
        title="Create your store"
        actionButtonName="Create Store"
      >
        <>No technical setup or coding required. Takes less than 5 minutes.</>
      </Form>

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
    </Layout>
  );
};
