import React from "react";
import { BsCheck } from "react-icons/bs";
import { Box, BoxProps, Circle, Text } from "@chakra-ui/react";
import { fontSizes } from "theme/typography";

interface Props extends BoxProps {
  isActive?: boolean;
  isComplete?: boolean;
  activeColor?: BoxProps["color"];
  size?: BoxProps["width"];
}

export const Step: React.FC<Props> = ({
  isActive,
  isComplete,
  activeColor = "white",
  children,
  ...props
}) => {
  const bgColor = isComplete
    ? "gray.700"
    : isActive
    ? activeColor
    : "transparent";

  const borderColor = isComplete
    ? "gray.700"
    : isActive
    ? activeColor
    : "whiteAlpha.700";

  return (
    <Circle
      bg={bgColor}
      size="22px"
      border="2px solid"
      borderColor={borderColor}
      {...props}
    >
      {isComplete ? (
        <Box color={activeColor}>
          <BsCheck color="inherit" size={fontSizes["2xl"]} />
        </Box>
      ) : (
        <Text
          color={isActive ? "blackAlpha.700" : "whiteAlpha.700"}
          lineHeight={0}
          variant="label-bold"
        >
          {children}
        </Text>
      )}
    </Circle>
  );
};
