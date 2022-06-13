import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Center } from "@chakra-ui/react";

import { ROUTES } from "routes";
import { Layout } from "components/Layout";
import { CreateMessage } from "components/CreateMessage";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";

import { useLocalState } from "./HomePage.state";

import { TokensList } from "./components/TokensList";
import { CongratulationsModal } from "./components/CongratulationsModal/CongratulationsModal";

export const HomePage: FC = () => {
  const { store, pending } = useLocalState();

  if (pending) {
    return (
      <Center width="full">
        <LoaderComponent title="loading store" darkBg />
      </Center>
    );
  }

  if (!store) {
    return (
      <Layout narrow>
        <CreateMessage>
          <Button flexGrow={1} size="lg" as={Link} to={ROUTES.createStore()}>
            Create Store
          </Button>
        </CreateMessage>
      </Layout>
    );
  }

  return (
    <Layout transparentNavbar={true}>
      <CongratulationsModal />

      <TokensList />
    </Layout>
  );
};
