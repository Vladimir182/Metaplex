import React from "react";
import { Button, Flex, FlexProps, Tag, Text, VStack } from "@chakra-ui/react";
import { Person } from "components/Person";
import { useCustomBreakpoints } from "../../hooks/useCustomBreakpoints";

interface Props extends FlexProps {
  address?: string;
}

export const ItemViewSale: React.FC<Props> = ({ address, ...props }) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <Flex alignSelf="stretch" pt={6} {...props}>
      <VStack spacing={2} alignItems="start">
        <Text variant="subtitle" color="whiteAlpha.700">
          Owner
        </Text>
        <Flex>
          <Person address={address} />
          {mdUp && <Tag variant="filled">You</Tag>}
        </Flex>
      </VStack>
      <Button ml="auto" variant="tertiary">
        List for sale
      </Button>
    </Flex>
  );
};
