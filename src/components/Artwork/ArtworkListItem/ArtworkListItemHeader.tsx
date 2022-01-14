import { Box, HStack, Image, Text } from "@chakra-ui/react";

import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  imgUrl: string;
  name: string;
  type?: string;
}

export const ArtworkListItemHeader: React.FC<Props> = ({
  imgUrl,
  name,
  type,
}) => {
  const { smDown } = useCustomBreakpoints();

  return (
    <HStack spacing={smDown ? 6 : 8} overflow="hidden">
      <Image w="64px" h="64px" borderRadius={1} src={imgUrl} />
      <Box overflow="hidden">
        <Text variant="body-bold" mb="5px" isTruncated={smDown} maxW="200px">
          {name}
        </Text>
        <Text
          variant="subtitle"
          color="whiteAlpha.500"
          textTransform="capitalize"
        >
          {type}
        </Text>
      </Box>
    </HStack>
  );
};
