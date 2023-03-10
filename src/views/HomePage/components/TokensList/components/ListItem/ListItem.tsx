import React from "react";
import { Flex, HStack, StackDivider } from "@chakra-ui/react";
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
  const marketId = sale?.id;

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
            <Header
              imgUrl={image}
              name={title}
              marketId={marketId}
              type={type}
              state={state}
            />
            <ArtworkStats artwork={artwork} />

            {earnings !== undefined && (
              <Earnings title="Primary Sale" saleAmount={earnings} />
            )}
          </HStack>
          <Actions artwork={artwork} sale={sale} state={state} />
        </Flex>
      </Flex>
    </HStack>
  );
};
