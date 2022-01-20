import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Center } from "@chakra-ui/react";

import { ROUTES } from "routes";
import { loadStoreFx } from "state/store";
import { Layout } from "components/Layout";
import { CreateMessage } from "components/CreateMessage";

import { CongratulationsModal } from "./CongratulationsModal/CongratulationsModal";
import { useLocalState } from "./HomePage.state";
import { TokensList } from "./TokensList";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";

export const HomePage: FC = () => {
  const { storeId, pendingStore } = useLocalState();

  useEffect(() => {
    loadStoreFx();
  }, []);

  if (pendingStore) {
    return (
      <Center width="full">
        <LoaderComponent title="loading store" darkBg />
      </Center>
    );
  }

  if (!storeId) {
    return (
      <CreateMessage>
        <Button flexGrow={1} size="lg" as={Link} to={ROUTES.createStore()}>
          Create Store
        </Button>
      </CreateMessage>
    );
  }

  return (
    <Layout transparentNavbar={true}>
      <CongratulationsModal />

      <TokensList />
    </Layout>
  );
};
