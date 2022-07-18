import { Box, BoxProps, HStack, Image, Text } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { IArt } from "state/artworks";

interface Props extends BoxProps {
  artwork?: IArt | null;
}

export const ArtworkListItemHeader: React.FC<Props> = ({
  artwork,
  ...props
}) => {
  const { xlUp } = useCustomBreakpoints();

  if (!artwork) return null;

  const { image, title, type, description } = artwork;

  return (
    <HStack
      spacing={6}
      overflow="hidden"
      bgColor={xlUp ? "transparent" : "whiteAlpha.50"}
      borderRadius={xlUp ? "none" : "xl"}
      p={xlUp ? 0 : 4}
      {...props}
    >
      <Image
        w="64px"
        h="64px"
        borderRadius="12px"
        src={image}
        objectFit="cover"
      />
      <Box overflow="hidden">
        <Text variant="body-bold" mb="5px" isTruncated>
          {title}
        </Text>
        {type && (
          <Text
            variant="subtitle"
            color="whiteAlpha.500"
            textTransform="capitalize"
          >
            {type}
          </Text>
        )}
        {description && <Text>{description}</Text>}
      </Box>
    </HStack>
  );
};
