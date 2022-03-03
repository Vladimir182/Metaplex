import { FC } from "react";
import { Layout } from "components/Layout";
import { Center, Flex } from "@chakra-ui/react";
import { PreviePane } from "./components/TokenPreviewPane";
import { TokenDetailsInfo } from "./components/TokenDetailsInfo/TokenDetailsIInfo";
import { useLocalState } from "./TokenDetails.state";
import { useParams } from "react-router-dom";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { MODAL_COPY } from "views/HomePage/components/TokensList/data";
import { ActionType } from "views/HomePage/components/TokensList/state/store/progress";
import { BsWallet2 } from "react-icons/bs";
import { fontSizes } from "theme/typography";

export const TokenDetails: FC = () => {
  const { itemId } = useParams();
  const { artworkSummary, pending, artwork, progress } = useLocalState(itemId);
  const { img } = artworkSummary || {};

  const { title, subtitle } =
    MODAL_COPY[progress.type || ActionType.CloseMarket];

  if (pending) {
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
