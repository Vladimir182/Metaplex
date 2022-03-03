import React, { useCallback } from "react";
import { Heading, VStack, Flex } from "@chakra-ui/layout";
import { Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsWallet2 } from "react-icons/bs";

import { ROUTES } from "routes";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { fontSizes } from "theme/typography";

import { ActionType } from "./state/store/progress";
import { ArtworkListItem } from "./components/ArtworkListItem";
import { ClaimSuccess } from "./components/ClaimSuccess";
import { ErrorModal } from "./components/ErrorModal";
import { MODAL_COPY } from "./data";
import { useLocalState } from "./state";

export const TokensList: React.FC = () => {
  const navigate = useNavigate();
  const { artworks, pending, storeId, progress } = useLocalState();

  const { title, subtitle } =
    MODAL_COPY[progress.type || ActionType.CloseMarket];

  const onCreate = useCallback(
    () => storeId && navigate(ROUTES.createNft()),
    [storeId, navigate]
  );

  return (
    <>
      <VStack spacing={4} p={3} align="stretch" mb={5}>
        <Flex justifyContent="space-between">
          <Heading variant="h3">Token Management Console</Heading>
          <Button background="#00FFBD" onClick={onCreate}>
            Create New
          </Button>
        </Flex>
      </VStack>
      {pending ? (
        <Center width="full">
          <LoaderComponent title="loading items" darkBg />
        </Center>
      ) : (
        artworks.map((artwork) => (
          <ArtworkListItem
            onClick={(id: string) =>
              navigate(ROUTES.tokenDetails({ ":itemId": id }))
            }
            variant="sell"
            key={artwork.id}
            artwork={artwork}
          />
        ))
      )}

      <InfiniteProgress
        isOpen={progress.isVisible}
        title={title}
        subtitle={subtitle}
        noteIcon={<BsWallet2 size={fontSizes["2xl"]} color="whiteAlpha.700" />}
        noteText='You may also have to approve the purchase in your wallet if you don&apos;t have "auto-approve" turned on.'
      />

      <ErrorModal />
      <ClaimSuccess />
    </>
  );
};
