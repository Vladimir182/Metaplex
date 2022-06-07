import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";

import { ArtworkListItemStatus } from "../ArtworkListItemStatus";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  imgUrl: string;
  name: string;
  type?: string;
  state?: MarketState;
}

export const ArtworkListItemHeader: React.FC<Props> = ({
  imgUrl,
  name,
  state = MarketState.Uninitialized,
}) => {
  const { smDown } = useCustomBreakpoints();

  return (
    <HStack spacing={smDown ? 6 : 8} overflow="hidden" width="35%">
      <Image w="64px" h="64px" borderRadius={12} src={imgUrl} />
      <Box overflow="hidden">
        <Text
          variant="body-bold"
          mb="5px"
          isTruncated={smDown}
          maxW="200px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {name}
        </Text>
        {/* <Text
          variant="subtitle"
          color="whiteAlpha.500"
          textTransform="capitalize"
        >
          {type}
        </Text> */}
        <ArtworkListItemStatus state={state} />
      </Box>
    </HStack>
  );
};
