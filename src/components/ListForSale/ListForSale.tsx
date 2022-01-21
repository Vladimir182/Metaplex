import React from "react";
import { VStack } from "@chakra-ui/layout";
import { BoxProps, Button } from "@chakra-ui/react";

interface Props extends BoxProps {
  embed: () => void;
}

export const ListForSale: React.FC<Props> = ({ embed, ...boxProps }) => {
  return (
    <VStack spacing={4} {...boxProps} alignItems="stretch">
      <Button variant="ghost" size="lg" onClick={embed}>
        Embed
      </Button>
    </VStack>
  );
};
