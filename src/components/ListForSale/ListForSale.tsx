import React from "react";
import { VStack } from "@chakra-ui/layout";
import { BoxProps, Button } from "@chakra-ui/react";

interface Props extends BoxProps {
  listForSale: () => void;
  viewInProfile: () => void;
  embed: () => void;
}

export const ListForSale: React.FC<Props> = ({
  listForSale,
  viewInProfile,
  embed,
  ...boxProps
}) => {
  return (
    <VStack spacing={4} {...boxProps} alignItems="stretch">
      <Button variant="primary" size="lg" onClick={listForSale}>
        List for sale
      </Button>
      <Button variant="ghost" size="lg" onClick={viewInProfile}>
        View in profile
      </Button>
      <Button variant="ghost" size="lg" onClick={embed}>
        Embed
      </Button>
    </VStack>
  );
};
