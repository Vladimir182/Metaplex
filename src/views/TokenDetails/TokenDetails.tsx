import { FC } from "react";
import { BsWallet2 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Center, Flex } from "@chakra-ui/react";
import { fontSizes } from "theme/typography";
import { MODAL_COPY } from "views/HomePage/components/TokensList/data";
import { ActionType } from "views/HomePage/components/TokensList/state/store/progress";

import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";

import { TokenDetailsInfo } from "./components/TokenDetailsInfo/TokenDetailsIInfo";
import { PreviePane } from "./components/TokenPreviewPane";
import { useLocalState } from "./TokenDetails.state";

export const TokenDetails: FC = () => {
  const { itemId } = useParams();
  const { artworkSummary, isInitalLoadHappened, artwork, progress } =
    useLocalState(itemId);
  const { img } = artworkSummary || {};

  const { title, subtitle } =
    MODAL_COPY[progress.type || ActionType.CloseMarket];

  if (!isInitalLoadHappened) {
    return (
      <Center width="full">
        <LoaderComponent title="loading item" darkBg />
      </Center>
    );
  }

  return (
    <Layout noPadding fullHeight>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        maxWidth="100vw"
        mt={16}
        flexGrow={1}
        alignItems="stretch"
      >
        <PreviePane sourceUrl={img} />
        <TokenDetailsInfo artwork={artwork} artworkSummary={artworkSummary} />
      </Flex>

      <InfiniteProgress
        isOpen={progress.isVisible}
        title={title}
        subtitle={subtitle}
        noteIcon={<BsWallet2 size={fontSizes["2xl"]} color="whiteAlpha.700" />}
        noteText='You may also have to approve the purchase in your wallet if you don&apos;t have "auto-approve" turned on.'
      />
    </Layout>
  );
};
