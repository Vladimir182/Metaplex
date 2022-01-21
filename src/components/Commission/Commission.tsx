import { Box, Button, Flex } from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";
import React from "react";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";

interface Props {
  price: number;
  dollarPrice: number;
  isActive: boolean;
  onClick: (isActive: boolean) => void;
  onCancel: () => void;
}

export const Commission: React.FC<Props> = ({
  price,
  dollarPrice,
  isActive,
  onClick,
  onCancel,
}) => {
  return (
    <Flex flexDirection="column">
      <Box bg="whiteAlpha.50" p={4} borderRadius="xl">
        <TitledBlock title="Creation Fee" variant="sm">
          <SolUsdDisplay sol={price} usd={dollarPrice} />
        </TitledBlock>
        <Button
          leftIcon={isActive ? <MdAdd /> : undefined}
          onClick={() => onClick(isActive)}
          mt={6}
          width={"full"}
          h={"56px"}
          variant={isActive ? "primary" : "tertiary"}
        >
          Confirm & Create
        </Button>
      </Box>
      <Button
        onClick={onCancel}
        mt={3}
        mx={4}
        alignSelf="stretch"
        variant="ghost"
      >
        Back
      </Button>
    </Flex>
  );
};
