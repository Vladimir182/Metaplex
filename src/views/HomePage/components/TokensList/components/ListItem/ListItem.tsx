import React from "react";
import { Flex, HStack, StackDivider, Text } from "@chakra-ui/react";
import { IArt } from "state/artworks";
import { IFixedPrice } from "state/sales";
import { getArtworkState } from "utils/getArtworkState";

import { ArtworkStats } from "components/DataDisplay/ArtworkStats";

import { Actions } from "./components/Actions";
import { Earnings } from "./components/Earnings";
import { Header } from "./components/Header";

interface Props {
  artwork: IArt;
  sale?: IFixedPrice;
  onClick?: (id: string) => void;
}

export const ListItem: React.FC<Props> = ({ artwork, sale, onClick }) => {
  const { id, image, title } = artwork;
  const { earnings, state = getArtworkState(artwork) } = sale || {};

  const type = artwork.type;

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
            <Header imgUrl={image} name={title} type={type} state={state} />
            <ArtworkStats
              supply={artwork.prints?.supply}
              maxSupply={artwork.prints?.maxSupply}
            />

            {earnings !== undefined && (
              <Earnings title="Primary Sale" saleAmount={earnings} />
            )}
          </HStack>
          <Actions artwork={artwork} sale={sale} state={state} />
        </Flex>
        <Text
          fontSize={14}
          textOverflow="ellipsis"
          maxW="64px"
          whiteSpace="nowrap"
        >
          {sale?.id}
        </Text>
      </Flex>
    </HStack>
  );
};
