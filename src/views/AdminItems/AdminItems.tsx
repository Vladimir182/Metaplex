import { useCallback, FC, useState } from "react";
import { Container, Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { ArtworksGrid, ArtworkGridCreateButton } from "components/ArtworksGrid";
import { useLocalState } from "./AdminItems.state";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { ListForSaleDialog } from "components/ListForSaleDialog";
import { IArt } from "state/artworks";

export const AdminItems: FC = () => {
  const {
    artworks,
    pendingArtworks,
    storeId,
    onSubmitInstantSale,
    onChangeTab,
  } = useLocalState();

  const [selectedArtwork, setSelectedArtwork] = useState<IArt | null>(null);
  const hideModal = useCallback(() => {
    setSelectedArtwork(null);
  }, [setSelectedArtwork]);
  const handleOnSale = useCallback(
    (art: IArt) => {
      setSelectedArtwork(art);
    },
    [setSelectedArtwork]
  );

  const navigate = useNavigate();
  const onCreate = useCallback(
    () => storeId && navigate(ROUTES.createNft()),
    [storeId, navigate]
  );

  return (
    <Container maxW="container.xl">
      <Box mb={30} mt={33}>
        <Heading variant="h3">Items</Heading>
      </Box>
      {artworks ? (
        <ArtworksGrid
          defaultView="list"
          tabs={[
            { id: "all", title: "All" },
            { id: "masters", title: "Masters" },
            { id: "editions", title: "Editions" },
          ]}
          onChangeTabs={onChangeTab}
          createButton={
            <ArtworkGridCreateButton onClick={onCreate}>
              {"New Items"}
            </ArtworkGridCreateButton>
          }
          items={{ type: "artworks", value: artworks }}
          pending={pendingArtworks}
          activeTab="sale"
          onSell={handleOnSale}
        />
      ) : null}

      <ListForSaleDialog
        isVisible={!!selectedArtwork}
        hideModal={hideModal}
        artworkSummary={{
          img: selectedArtwork?.image ?? "",
          title: selectedArtwork?.title ?? "",
          artist: "", // TODO: ???
          edition: "", // TODO: ???
          total: selectedArtwork?.prints?.supply ?? 0,
        }}
        onSubmit={onSubmitInstantSale}
      />
    </Container>
  );
};
