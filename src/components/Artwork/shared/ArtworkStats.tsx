import {
  HStack,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/layout";

import { Dayjs } from "dayjs";
import { SolUsdDisplay } from "components/SolUsdDisplay";
import { ArtworkCardVariant } from "state/artworks";

interface Props extends StackProps {
  date: Date | Dayjs | string;
  editions: number | string;
  supplyType: string;
  variant?: ArtworkCardVariant;
  usd?: number;
  sol?: number;
}

export const ArtworkStats: React.FC<Props> = ({
  date,
  editions,
  supplyType,
  variant,
  sol,
  usd,
  ...rest
}) => {
  const isSeller = variant === "onSale";

  return (
    <HStack
      spacing={4}
      divider={<StackDivider borderColor="whiteAlpha.100" />}
      {...rest}
    >
      {isSeller && (
        <VStack spacing={2} alignItems="start">
          <Text variant="label-bold">Price</Text>
          <SolUsdDisplay sol={sol} usd={usd} />
        </VStack>
      )}

      {!isSeller && (
        <VStack spacing={2} alignItems="start">
          <Text variant="label-bold">MINTED</Text>
          <Text variant="subtitle">{date || "-"}</Text>
        </VStack>
      )}

      {!isSeller && (
        <VStack spacing={2} alignItems="start">
          <Text variant="label-bold">EDITIONS</Text>
          <Text variant="subtitle">{editions}</Text>
        </VStack>
      )}

      <VStack spacing={2} alignItems="start">
        <Text variant="label-bold">SUPPLY</Text>
        <Text variant="subtitle" textTransform="capitalize">
          {supplyType}
        </Text>
      </VStack>
    </HStack>
  );
};
