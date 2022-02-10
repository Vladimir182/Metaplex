import React from "react";
import { VStack } from "@chakra-ui/layout";
import { BoxProps, Button } from "@chakra-ui/react";

interface Props extends BoxProps {
  viewList: () => void;
}

export const ListForSale: React.FC<Props> = ({ viewList, ...boxProps }) => {
  return (
    <VStack spacing={4} {...boxProps} alignItems="stretch">
      <Button variant="ghost" size="lg" onClick={viewList}>
        Back to list of tokens
      </Button>
    </VStack>
  );
};
