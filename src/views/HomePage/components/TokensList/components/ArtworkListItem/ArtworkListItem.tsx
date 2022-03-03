import { HStack, StackDivider, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/types";

import { ArtworkCardVariant, IArt } from "state/artworks";
import { ArtworkListItemStatus } from "./components/ArtworkListItemStatus";
import { ArtworkListItemActions } from "./components/ArtworkListItemActions";
import { ArtworkListItemHeader } from "./components/ArtworkListItemHeader";
import { ArtworkStats } from "components/Artwork/shared";
import { ArtworkListItemSaleAmount } from "./components/ArtworkListItemSaleAmount";

interface Props {
  artwork: IArt;
  variant?: ArtworkCardVariant;
  onClick?: (id: string) => void;
}

export const ArtworkListItem: React.FC<Props> = ({
  artwork,
  variant,
  onClick,
}) => {
  const {
    id,
    image,
    title,
    startDate,
    endDate,
    market,
    state = MarketState.Uninitialized,
  } = artwork;

  const type = artwork.type;
  const isExhaustedMints = artwork.prints?.supply === artwork.prints?.maxSupply;
  const hasAmount = typeof artwork.primarySaleAmount !== "undefined";

  return (
    <HStack
      bg="gray.800"
      spacing={4}
      p={4}
      borderRadius="xl"
      mb={4}
      onClick={() => onClick && onClick(id)}
      cursor="pointer"
    >
      <Flex direction="column" w="100%">
        <Flex align="center">
          <HStack
            spacing={4}
            w="calc(100% - 140px)"
            align="middle"
            divider={<StackDivider borderColor="whiteAlpha.100" />}
          >
            <ArtworkListItemHeader imgUrl={image} name={title} type={type} />
            <ArtworkStats
              supply={artwork.prints?.supply}
              maxSupply={artwork.prints?.maxSupply}
              variant={variant}
            />

            {hasAmount && (
              <ArtworkListItemSaleAmount
                title="Primary Sale"
                saleAmount={artwork.primarySaleAmount}
              />
            )}

            <ArtworkListItemStatus state={state} startDate={startDate} />
          </HStack>
          <ArtworkListItemActions
            artwork={artwork}
            state={state}
            endDate={endDate}
            isExhaustedMints={isExhaustedMints}
          />
        </Flex>
        <Text fontSize={14}>{market}</Text>
      </Flex>
    </HStack>
  );
};
