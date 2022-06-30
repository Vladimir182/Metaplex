import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { Status } from "../Status";

interface Props {
  imgUrl: string;
  name: string;
  type?: string;
  state?: MarketState;
}

export const Header: React.FC<Props> = ({
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
        <Status state={state} />
      </Box>
    </HStack>
  );
};