import React, { useCallback } from "react";
import { Heading, VStack, Flex } from "@chakra-ui/layout";
import { Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "routes";
import { ArtworkListItem } from "components/Artwork";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";

import { useLocalState } from "./TokensList.state";

export const TokensList: React.FC = () => {
  const navigate = useNavigate();
  const { artworks, pendingArtworks, storeId } = useLocalState();

  const onCreate = useCallback(
    () => storeId && navigate(ROUTES.createNft()),
    [storeId]
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
      {pendingArtworks ? (
        <Center width="full">
          <LoaderComponent title="loading items" darkBg />
        </Center>
      ) : (
        artworks.map((artwork, i) => (
          <ArtworkListItem
            variant="sell"
            key={`${artwork.id}_${i}`}
            artwork={artwork}
          />
        ))
      )}
    </>
  );
};
