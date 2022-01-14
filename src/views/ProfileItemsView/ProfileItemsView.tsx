import { Heading, Text, VStack } from "@chakra-ui/layout";
import { ArtworkGridCreateButton, ArtworksGrid } from "components/ArtworksGrid";
import { useLocalState } from "./ProfileItemsView.state";
import { Layout } from "components/Layout";
import { MainSidebarContent } from "components/MainSidebar";
import { MdRefresh } from "react-icons/md";
import { fontSizes } from "theme/typography";
import { ListForSaleDialog } from "components/ListForSaleDialog";

export const ProfileItemsView: React.FC = () => {
  const {
    tabs,
    user,
    artworks,
    pendingArtworks,
    onRefresh,
    onChangeTabs,
    isShowListForSale,
    hideModal,
    artworkSummary,
    onSubmitInstantSale,
  } = useLocalState();
  return (
    <Layout sidebarContent={<MainSidebarContent user={user} />}>
      <VStack spacing={4} p={3} align="stretch">
        <Heading variant="h3">Items</Heading>
        <Text variant="body-large">
          All of the items you’ve purchased on Street Dreams.
        </Text>
        <ArtworksGrid
          tabs={tabs}
          items={{ type: "artworks", value: artworks }}
          pending={pendingArtworks}
          createButton={
            <ArtworkGridCreateButton
              onClick={onRefresh}
              variant="solid"
              leftIcon={<MdRefresh size={fontSizes["2xl"]} />}
            >
              {" Refresh"}
            </ArtworkGridCreateButton>
          }
          onChangeTabs={onChangeTabs}
        />

        <ListForSaleDialog
          isVisible={isShowListForSale}
          hideModal={hideModal}
          artworkSummary={artworkSummary}
          onSubmit={onSubmitInstantSale}
        />
      </VStack>
    </Layout>
  );
};
