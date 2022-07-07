import React from "react";
import { Image } from "@chakra-ui/image";
import { Flex, FlexProps, Text, VStack } from "@chakra-ui/layout";

import { SupplyDetails } from "../shared/SupplyDetails";

export interface ArtworkSummaryProps extends FlexProps {
  img?: string;
  title: string;
  artist: string;
  edition?: number;
  total?: number;
}

export const ArtworkSummary: React.FC<ArtworkSummaryProps> = ({
  img,
  title,
  artist,
  edition,
  total,
  ...rest
}) => {
  return (
    <Flex
      h="96px"
      bgColor="whiteAlpha.50"
      align="center"
      p={4}
      borderRadius="xl"
      {...rest}
    >
      <Image mr={4} w="64px" h="64px" borderRadius={1} src={img} />
      <VStack align="start" spacing={1 / 2}>
        <Text variant="body-bold">{title}</Text>
        <Text variant="body">{artist}</Text>
      </VStack>
      <SupplyDetails
        flexShrink={0}
        edition={edition}
        maxSupply={total}
        m={2}
        ml="auto"
        variant="short"
      />
    </Flex>
  );
};
