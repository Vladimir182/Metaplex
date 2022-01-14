import { Heading } from "@chakra-ui/layout";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { ArtworkDummy } from "components/ArtworkDummy";
import { ArtworkGridCreateButton, ArtworksGrid } from "components/ArtworksGrid";
import { Hero } from "components/Hero";
import { Layout } from "components/Layout";
import { PurchaseDialog } from "components/PurchaseDialog";
import { useStore } from "effector-react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { IArt } from "state/artworks";
import { Listing } from "state/listing";
import { $user } from "state/wallet";
import { CongratulationsModal } from "./CongratulationsModal/CongratulationsModal";
import { HowToBuyModal } from "./HowToBuyModal";
import { useLocalState } from "./StorePage.state";
import { WalletNotConnectedPageContent } from "./WalletNotConnectedPageContent";

export const StorePage: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isSeller,
    storeId,
    form,
    listings,
    pendingArtworks,
    tabs,
    activeTab,
    onChangeTab,
  } = useLocalState();
  const navigate = useNavigate();
  const { mdUp } = useCustomBreakpoints();
  const user = useStore($user);

  const [sellListing, setSellListing] = useState<Listing | null>(null);
  const onClosePurchase = useCallback(() => {
    setSellListing(null);
  }, [setSellListing]);
  const showPurchase = useCallback(
    (art: IArt) => {
      const { listing } = art as never;
      if (listing) {
        setSellListing(listing);
      }
    },
    [setSellListing]
  );

  const onCreate = useCallback(
    () =>
      storeId &&
      navigate(
        ROUTES.createNft({
          ":storeId": storeId,
        })
      ),
    [storeId]
  );
  const onSell = useCallback(
    (art: IArt) =>
      navigate(
        ROUTES.item({
          ":itemId": art.id,
        })
      ),
    []
  );

  return (
    <Layout transparentNavbar={true}>
      <CongratulationsModal />

      <Box
        zIndex={-1}
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="704px"
        bgImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.2) 66%, rgba(0, 0, 0, 1) 100%), url("${
          form?.coverImg ?? ""
        }")`}
        bgPos="top"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgAttachment="scroll"
        filter={`blur(${mdUp ? 100 : 30}px)`}
        willChange="transform"
        style={{ transform: "translateZ(0)" }}
      />

      <Hero
        title={form?.name ?? ""}
        text={form?.description ?? ""}
        logo={form?.logoImg ?? ""}
        coverImage={form?.coverImg ?? ""}
        my={6}
      >
        <Button w={mdUp ? undefined : "full"} onClick={onOpen}>
          How to buy
        </Button>
        <HowToBuyModal
          isOpen={isOpen}
          onClose={onClose}
          storeName={form?.name ?? ""}
        />
      </Hero>

      {isSeller && (
        <Box mb={30} mt={33}>
          <Heading variant="h3">Items</Heading>
        </Box>
      )}

      <WalletNotConnectedPageContent />

      {user && listings ? (
        <ArtworksGrid
          onSell={onSell}
          tabs={tabs}
          items={{ type: "listing", value: listings }}
          hideActionButtons
          onNewEdition={showPurchase}
          pending={pendingArtworks}
          noItemsDummy={
            <ArtworkDummy
              title={isSeller ? "Create a new Item" : "No items"}
              bodyText={
                isSeller
                  ? "Your items listed for sale will appear here, create your first one!"
                  : "Items listed for sale will appear here"
              }
              onCreateNewItem={isSeller ? onCreate : undefined}
            />
          }
          activeTab={activeTab}
          onChangeTabs={onChangeTab}
          createButton={
            <ArtworkGridCreateButton onClick={onCreate}>
              {"New Item"}
            </ArtworkGridCreateButton>
          }
        />
      ) : null}
      {sellListing && (
        <PurchaseDialog
          listing={sellListing}
          isVisible={!!sellListing}
          hideModal={onClosePurchase}
        />
      )}
    </Layout>
  );
};
