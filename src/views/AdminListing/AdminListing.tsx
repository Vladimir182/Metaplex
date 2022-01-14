import { useCallback, FC } from "react";
import { Container, Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { ArtworksGrid, ArtworkGridCreateButton } from "components/ArtworksGrid";
import { useLocalState } from "./AdminListing.state";

export const AdminListing: FC = () => {
  const { listings, pendingArtworks, onChangeTab } = useLocalState();

  const onCreate = useCallback(() => {}, [history]);

  return (
    <Container maxW="container.xl">
      <Box mb={30} mt={33}>
        <Heading variant="h3">Listings</Heading>
      </Box>
      {listings ? (
        <ArtworksGrid
          tabs={[
            {
              id: "sale",
              title: "For sale",
            },
            {
              id: "sold",
              title: "Sold",
            },
          ]}
          onChangeTabs={onChangeTab}
          createButton={
            <ArtworkGridCreateButton onClick={onCreate}>
              {" New Listing"}
            </ArtworkGridCreateButton>
          }
          items={{ type: "listing", value: listings }}
          pending={pendingArtworks}
          activeTab="sale"
        />
      ) : null}
    </Container>
  );
};
