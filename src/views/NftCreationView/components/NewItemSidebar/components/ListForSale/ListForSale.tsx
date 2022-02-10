import React from "react";
import { VStack } from "@chakra-ui/layout";
import { BoxProps, Button } from "@chakra-ui/react";

interface Props extends BoxProps {
  listForSale?: () => void;
  viewList: () => void;
}

export const ListForSale: React.FC<Props> = ({
  listForSale,
  viewList,
  ...boxProps
}) => {
  return (
    <VStack spacing={4} {...boxProps} alignItems="stretch">
      {listForSale && (
        <Button variant="primary" size="lg" onClick={listForSale}>
          Continue to sell copies
        </Button>
      )}
      <Button variant="ghost" size="lg" onClick={viewList}>
        Back to list of tokens
      </Button>
    </VStack>
  );
};
