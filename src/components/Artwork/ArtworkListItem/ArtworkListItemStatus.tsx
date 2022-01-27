import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  status: number;
}

interface StatusThemeType {
  [key: string]: {
    [key: number]: string;
  };
}

const StatusTheme: StatusThemeType = {
  border: {
    1: "pink.600",
    2: "green.500",
    4: "gray.700",
  },
  color: {
    1: "white",
    2: "white",
    4: "whiteAlpha.300",
  },
  text: {
    1: "New",
    2: "On Sale",
    4: "Sale Ended",
  },
};

export const ArtworkListItemStatus: React.FC<Props> = ({ status }) => {
  return (
    <Box
      borderRadius={8}
      border="1px"
      borderColor={StatusTheme.border[status]}
      py={1}
      px={4}
    >
      <Text fontWeight="bold" fontSize={14} color={StatusTheme.color[status]}>
        {StatusTheme.text[status]}
      </Text>
    </Box>
  );
};
