import { Box, BoxProps, Center, HStack, Heading, Text } from "@chakra-ui/react";

import React from "react";
import { sizeToPixels } from "utils/sizeToPixels";

interface Props extends BoxProps {
  isActive: boolean;
  typeName: string;
  accept: string;
  size?: number | string;
  disabled?: boolean;
}

export const MediaTypeItem: React.FC<Props> = ({
  isActive,
  typeName,
  accept,
  children,
  size = "64px",
  disabled,
  ...props
}) => {
  const primaryTextColor = disabled ? "whiteAlpha.600" : "white";
  const secondaryTextColor = disabled ? "whiteAlpha.400" : "whiteAlpha.700";

  return (
    <Box
      layerStyle={isActive ? "active" : "base"}
      _hover={{ backgroundColor: disabled ? undefined : "whiteAlpha.100" }}
      {...props}
    >
      <HStack spacing={6}>
        <Center
          h={sizeToPixels(size)}
          w={sizeToPixels(size)}
          bg={isActive ? "green.500" : "gray.900"}
          color={isActive ? "black" : primaryTextColor}
          borderRadius="2xl"
        >
          {children}
        </Center>
        <Box>
          <Heading
            variant="h5"
            color={primaryTextColor}
            textTransform="capitalize"
          >
            {typeName}
          </Heading>
          <Text
            mt={1}
            color={secondaryTextColor}
            variant="body"
            lineHeight="shorter"
            textTransform="uppercase"
          >
            {accept}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
