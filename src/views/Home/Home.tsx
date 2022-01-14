import { Button, Stack } from "@chakra-ui/react";
import { Hero } from "components/Hero";
import { Layout } from "components/Layout";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { Link } from "react-router-dom";
import { ROUTES } from "routes";

import { store } from "state/store/store.mock";

export const Home: React.FC = () => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <Layout>
      <Hero
        title="Launch NFTs from your own branded storefront"
        text="Discover why thousands of teams use Metaplex to share NFTs with their
      community."
      >
        <Stack
          direction={mdUp ? "row" : "column"}
          spacing={4}
          w={mdUp ? undefined : "full"}
        >
          <Button flexGrow={1} size="lg" as={Link} to={ROUTES.createStore()}>
            Create Store
          </Button>
          <Button
            flexGrow={1}
            size="lg"
            variant="primary"
            as={Link}
            to={ROUTES.store({
              ":storeId": store.storeId,
            })}
          >
            Go to Predefined Store
          </Button>
        </Stack>
      </Hero>
    </Layout>
  );
};
