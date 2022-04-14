import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

interface Props {
  state?: MarketState;
  endDate?: dayjs.Dayjs;
  startDate?: dayjs.Dayjs;
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

dayjs.extend(isSameOrBefore);

export const ArtworkListItemStatus: React.FC<Props> = ({
  state = MarketState.Uninitialized,
  startDate,
}) => {
  const shouldChangeStateToActive =
    !!startDate &&
    dayjs(startDate).isSameOrBefore(dayjs()) &&
    [MarketState.Active, MarketState.Created].includes(state);

  const updatedState = shouldChangeStateToActive ? MarketState.Active : state;

  return (
    <Box
      borderRadius={8}
      border="1px"
      borderColor={StatusTheme.border[updatedState]}
      py={1}
      px={4}
      height="100%"
      margin="auto 0"
      padding="2px 8px"
      display="inline-flex"
    >
      <Text
        fontWeight="bold"
        fontSize={12}
        color={StatusTheme.color[updatedState]}
      >
        {StatusTheme.text[updatedState]}
      </Text>
    </Box>
  );
};
