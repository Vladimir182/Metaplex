import { Box, Flex, HStack, Image, Text, useClipboard } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { SaleState } from "state/sales";
import { CopyButton } from "views/ItemView/components/Details/components/CopyButton";
import { getShortMarketId } from "views/ItemView/components/Details/utils";

import { Status } from "../Status";

interface Props {
  imgUrl: string;
  name: string;
  type?: string;
  state?: SaleState;
  marketId?: string;
}

export const Header: React.FC<Props> = ({
  imgUrl,
  name,
  marketId,
  state = SaleState.Uninitialized,
}) => {
  const { smDown, customXlUp } = useCustomBreakpoints();
  const marketIdClipboard = useClipboard(marketId ?? "");
  return (
    <HStack overflow="hidden" width="40%">
      <Image boxSize="64px" objectFit="cover" borderRadius={12} src={imgUrl} />
      <Flex
        justifyContent="space-between"
        flexWrap="wrap"
        flexDirection={customXlUp ? "row" : "column"}
        width="100%"
        alignItems={customXlUp ? "center" : "flex-start"}
        overflow="hidden"
      >
        <Flex ml="1rem" flexDirection="column">
          <Text
            variant="body-bold"
            mt={marketId ? 2 : 0}
            mb={!marketId && !customXlUp ? "0.5rem" : "0"}
            isTruncated={smDown}
            maxW="200px"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {name}
          </Text>
          {marketId && (
            <Flex pb={1} alignItems="center" justifyContent="space-between">
              <Text fontSize={12} textOverflow="ellipsis" whiteSpace="nowrap">
                {getShortMarketId(String(marketId))}
              </Text>
              <Box onClick={(e) => e.stopPropagation()}>
                <CopyButton clipboard={marketIdClipboard} />
              </Box>
            </Flex>
          )}
        </Flex>

        <Flex
          justifyContent="flex-start"
          width="8rem"
          ml={customXlUp ? "1.5rem" : "1rem"}
        >
          <Status state={state} />
        </Flex>
      </Flex>
    </HStack>
  );
};
