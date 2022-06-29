import React, { useCallback } from "react";
import { BsWallet2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, VStack } from "@chakra-ui/layout";
import { Button, Center } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { ROUTES } from "routes";
import { IArt } from "state/artworks";
import { IFixedPrice, isSale } from "state/sales";
import { fontSizes } from "theme/typography";

import { InfiniteProgress } from "components/Modals/InfiniteProgress";
import { LoaderComponent } from "components/Modals/InfiniteProgress/LoaderComponent";

import { ClaimSuccess } from "./components/ClaimSuccess";
import { ErrorModal } from "./components/ErrorModal";
import { ListItem } from "./components/ListItem";
import { ActionType } from "./state/store/progress";
import getArtworkActionsProps from "./utils/getArtworkActionsProps";
import { MODAL_COPY } from "./data";
import { useLocalState } from "./state";

export const TokensList: React.FC = () => {
  const navigate = useNavigate();
  const { $sales, $profileArtworks, isInitalLoadHappened, storeId, progress } =
    useLocalState();

  const sales = useStore($sales);
  const profileArtworks = useStore($profileArtworks);

  const { title, subtitle } =
    MODAL_COPY[progress.type || ActionType.CloseMarket];

  const onCreate = useCallback(
    () => storeId && navigate(ROUTES.createNft()),
    [storeId, navigate]
  );

  const handleListItemClick = useCallback(
    (item: IArt | IFixedPrice) => {
      isSale(item)
        ? navigate(ROUTES.saleDetails({ ":saleId": item.id }))
        : navigate(ROUTES.itemDetails({ ":itemId": item.accountAddress }));
    },
    [navigate]
  );

  const renderListItem = useCallback(
    (item: IFixedPrice | IArt) => {
      const artworkActionProps = getArtworkActionsProps(item);
      const { artwork } = artworkActionProps;

      return (
        <ListItem
          onClick={() => handleListItemClick(item)}
          key={artwork.id}
          {...artworkActionProps}
        />
      );
    },
    [handleListItemClick]
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

      {isInitalLoadHappened && sales.map(renderListItem)}
      {isInitalLoadHappened && profileArtworks.map(renderListItem)}

      {!isInitalLoadHappened && (
        <Center width="full">
          <LoaderComponent title="loading items" darkBg />
        </Center>
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
