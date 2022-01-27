import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-membership-token/dist/src/types";

interface Props {
  state?: MarketState;
}

interface StatusThemeType {
  [key: string]: {
    [key: number]: string;
  };
}

const StatusTheme: StatusThemeType = {
  border: {
    [MarketState.Uninitialized]: "pink.600",
    [MarketState.Created]: "pink.600",
    [MarketState.Active]: "green.500",
    [MarketState.Ended]: "gray.700",
  },
  color: {
    [MarketState.Uninitialized]: "white",
    [MarketState.Created]: "white",
    [MarketState.Active]: "white",
    [MarketState.Ended]: "whiteAlpha.300",
  },
  text: {
    [MarketState.Uninitialized]: "New",
    [MarketState.Created]: "Sale Not Started",
    [MarketState.Active]: "On Sale",
    [MarketState.Ended]: "Sale Ended",
  },
};

export const ArtworkListItemStatus: React.FC<Props> = ({
  state = MarketState.Uninitialized,
}) => (
  <Box
    borderRadius={8}
    border="1px"
    borderColor={StatusTheme.border[state]}
    py={1}
    px={4}
    height="100%"
    margin="auto 0"
  >
    <Text fontWeight="bold" fontSize={14} color={StatusTheme.color[state]}>
      {StatusTheme.text[state]}
    </Text>
  </Box>
);
