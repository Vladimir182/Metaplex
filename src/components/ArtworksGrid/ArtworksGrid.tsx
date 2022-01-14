import { ArtworkCard, ArtworkListItem } from "components/Artwork";
import { ArtworkCardVariant, IArt } from "state/artworks";
import { Box, Center, Divider, Flex, Grid, Spacer } from "@chakra-ui/react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";

import { Listing } from "../../state/listing";
import { LoaderComponent } from "components/modals/InfiniteProgress/LoaderComponent";
import { Pagination } from "components/Pagination";
import { SwitchViewButton } from "components/buttons/SwitchView";
import { VStack } from "@chakra-ui/layout";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { usePagination } from "hooks/usePagination";
import { useTemplateColumns } from "./useTemplateColumns";

export interface ITab {
  id: string;
  title: string;
}

interface ItemsListing {
  type: "listing";
  value: Listing[];
}

interface ItemsArtworks {
  type: "artworks";
  value: IArt[];
}

type Items = ItemsListing | ItemsArtworks;

interface Props {
  tabs: ITab[];
  createButton?: ReactNode;
  hideActionButtons?: boolean;
  variant?: ArtworkCardVariant;
  items: Items;
  pending?: boolean;
  noItemsDummy?: ReactNode;
  activeTab?: string;
  defaultView?: "grid" | "list";
  onChangeTabs?(id: string, index: number): void;
  onNewEdition?: (artwork: IArt) => void;
  onSell?: (artwork: IArt) => void;
  onRemove?: (artwork: IArt) => void;
}

type View = React.ComponentProps<typeof SwitchViewButton>["currentView"];

export const ArtworksGrid: React.FC<Props> = ({
  tabs,
  createButton,
  hideActionButtons,
  defaultView = "grid",
  variant = "sell",
  items,
  pending = false,
  noItemsDummy,
  activeTab,
  onChangeTabs,
  onNewEdition,
  onSell,
  onRemove,
}) => {
  const [view, setView] = useState<View>(defaultView);
  const { smUp, mdUp } = useCustomBreakpoints();

  const artworks: IArt[] = useMemo(() => {
    const tempArtworks =
      items.type === "listing"
        ? items.value.map((listing) => ({
            ...listing.artwork,
            price: listing.price,
            listing,
          }))
        : items.value;

    return tempArtworks;
  }, [items]);

  const {
    items: currentPageArtworks,
    page,
    setPage,
    itemsPerPage,
  } = usePagination(artworks);
  const templateColumns = useTemplateColumns();

  const handleViewSwitch = useCallback(() => {
    setView((current) => (current === "grid" ? "list" : "grid"));
  }, [setView]);

  const onChangeTabsHandle = useCallback(
    (index: number) => {
      const tab = tabs[index];
      if (tab) {
        onChangeTabs?.(tab.id, index);
      }
    },
    [tabs, onChangeTabs]
  );

  const isGrid = view === "grid";
  const index = activeTab ? tabs.findIndex((it) => it.id === activeTab) : -1;
  const variantSelect = variant === "select";
  const [selectedArtwork, setSelectedArtwork] = useState<IArt | null>(null);

  const artworkItems = currentPageArtworks.map((artwork, i) =>
    isGrid ? (
      <ArtworkCard
        variant={variant}
        key={`${artwork.id}_${i}`}
        artwork={artwork}
        onNewEdition={onNewEdition}
        onSell={onSell}
      />
    ) : (
      <ArtworkListItem
        variant={variant}
        key={`${artwork.id}_${i}`}
        artwork={artwork}
        selected={variantSelect ? selectedArtwork === artwork : false}
        onSelect={variantSelect ? setSelectedArtwork : undefined}
        onNewEdition={onNewEdition}
        onSell={onSell}
        onRemove={onRemove}
      />
    )
  );

  return (
    <Flex direction="column" align="flex-start">
      {pending ? (
        <Center width="full">
          <LoaderComponent title="loading items" darkBg />
        </Center>
      ) : (
        <>
          {!smUp && createButton}
          <Flex alignSelf="stretch" flexWrap="wrap" style={{ gap: 24 }}>
            <Tabs
              onChange={onChangeTabsHandle}
              defaultIndex={index === -1 ? undefined : index}
            >
              <TabList>
                {tabs.map((tab) => (
                  <Tab key={tab.id}>{tab.title}</Tab>
                ))}
              </TabList>
            </Tabs>
            <Spacer />
            <Box>
              {!hideActionButtons && (
                <SwitchViewButton
                  variant={mdUp ? "desktop" : "mobile"}
                  useTooltip={smUp}
                  currentView={view}
                  onClick={handleViewSwitch}
                />
              )}
              {/* TODO: revert after demo */}
              {/* {smUp && !hideActionButtons && createButton} */}
              {smUp && createButton}
            </Box>
          </Flex>
          <Divider mt={3} mb={3} />

          {isGrid ? (
            <Grid templateColumns={templateColumns} width="100%" gap={8}>
              {artworkItems}
              {!artworks.length && noItemsDummy}
            </Grid>
          ) : (
            <VStack alignItems="stretch" w="full" spacing={4}>
              {artworkItems}
            </VStack>
          )}
          {artworks.length > currentPageArtworks.length && (
            <Pagination
              currentPage={page}
              itemsPerPage={itemsPerPage}
              total={artworks.length}
              onPageChange={setPage}
              mt={6}
              w="full"
            />
          )}
        </>
      )}
    </Flex>
  );
};
