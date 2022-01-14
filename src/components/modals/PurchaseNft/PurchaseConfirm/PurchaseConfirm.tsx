import { Button, Divider, Stack, VStack } from "@chakra-ui/react";

import { FC } from "react";
import { PersonProps } from "components/Person";
import { PurchaseConfirmHead } from "./PurchaseConfirmHead";
import { SolUsdDisplay } from "components/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  image?: string;
  title?: string;
  artist?: PersonProps;
  price?: number;
  dollarPrice?: number | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PurchaseConfirm: FC<Props> = ({
  image,
  title,
  artist,
  price,
  dollarPrice,
  onConfirm,
  onCancel,
}) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <VStack
      bgColor="whiteAlpha.50"
      borderRadius="lg"
      borderColor="white"
      alignItems="stretch"
      p={6}
      spacing={6}
    >
      <PurchaseConfirmHead image={image} title={title} artist={artist} />
      <Divider />
      <TitledBlock title="Total" variant="sm">
        <SolUsdDisplay sol={price} usd={dollarPrice} />
      </TitledBlock>
      <Stack
        direction={mdUp ? "row" : "column-reverse"}
        justify="flex-end"
        alignItems="stretch"
        spacing={3}
      >
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="primary">
          Confirm
        </Button>
      </Stack>
    </VStack>
  );
};
