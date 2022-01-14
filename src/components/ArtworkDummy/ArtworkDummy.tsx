import { Circle, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { CreateButton } from "components/buttons/CreateButton";
import { FC } from "react";
import { MdAdd } from "react-icons/md";
import { customSize } from "global-const/customSize";
import { fontSizes } from "theme/typography";

interface Props {
  title?: string;
  bodyText?: string;
  onCreateNewItem?: () => void;
}

export const ArtworkDummy: FC<Props> = ({
  title,
  bodyText,
  onCreateNewItem,
}) => {
  return (
    <Flex
      w={customSize.artwork.card.width}
      minH={customSize.artwork.card.height}
      borderRadius="xl"
      bg="gray.800"
      align="center"
      justify="center"
      px={6}
    >
      <VStack spacing={8}>
        <Circle bg="whiteAlpha.100" boxSize="64px">
          <MdAdd size={fontSizes["2xl"]} />
        </Circle>
        <VStack alignItems="center">
          <Heading variant="h4">{title}</Heading>
          <Text textAlign="center">{bodyText}</Text>
        </VStack>
        <CreateButton size="xl" onClick={onCreateNewItem}>
          Create New Item
        </CreateButton>
      </VStack>
    </Flex>
  );
};
