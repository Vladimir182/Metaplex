import { Box, Button, Flex } from "@chakra-ui/react";

import React from "react";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";
import { $errorsStore } from "components/forms/NftCreate/helper";
import { useStore } from "effector-react";

interface Props {
  price?: number;
  dollarPrice?: number;
  isActive: boolean;
  submitText?: string;
  onClick: (isActive: boolean) => void;
  onCancel: () => void;
}

export const Commission: React.FC<Props> = ({
  price,
  dollarPrice,
  isActive,
  submitText = "Confirm & Create",
  onClick,
  onCancel,
}) => {
  const data = useStore($errorsStore);
  const errorMessage = data?.errorMessage;
  const shoulEnableConfirmAndCreateButton = !!errorMessage;

  return (
    <Flex flexDirection="column">
      <Box bg="whiteAlpha.50" p={4} borderRadius="xl">
        {!!(price || dollarPrice) && (
          <TitledBlock title="Creation Fee" variant="sm">
            <SolUsdDisplay sol={price} usd={dollarPrice} />
          </TitledBlock>
        )}
        <Button
          onClick={() => onClick(isActive)}
          mt={6}
          width={"full"}
          h={"56px"}
          variant={isActive ? "primary" : "tertiary"}
          isDisabled={shoulEnableConfirmAndCreateButton}
        >
          {submitText}
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
