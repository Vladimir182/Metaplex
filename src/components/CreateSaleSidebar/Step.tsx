import { BoxProps, Circle, Text } from "@chakra-ui/react";
import React from "react";

interface Props extends BoxProps {
  isActive?: boolean;
}

export const Step: React.FC<Props> = ({ isActive, children }) => {
  return (
    <Circle
      bg={isActive ? "white" : "transparent"}
      size="24px"
      border="2px solid"
      borderColor={isActive ? "white" : "whiteAlpha.700"}
    >
      <Text
        color={isActive ? "rgba(0, 0, 0, 0.7)" : "whiteAlpha.700"}
        lineHeight={0}
        variant="label-bold"
      >
        {children}
      </Text>
    </Circle>
  );
};
