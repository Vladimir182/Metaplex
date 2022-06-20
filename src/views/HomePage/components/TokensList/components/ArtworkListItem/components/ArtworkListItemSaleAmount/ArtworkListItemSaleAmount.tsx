import {
  HStack,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/layout";

import { useSolToUsd } from "state/react/useSolToUsd";

import { truncateDecimals } from "utils/truncateDecimals";

interface Props extends StackProps {
  title: string;
  saleAmount?: number;
}

export const ArtworkListItemSaleAmount: React.FC<Props> = ({
  title,
  saleAmount,
  ...props
}) => {
  const hasAmount = typeof saleAmount !== "undefined";
  const usd = useSolToUsd(saleAmount);

  return (
    <HStack
      width="20%"
      spacing={4}
      divider={<StackDivider borderColor="whiteAlpha.100" />}
      {...props}
    >
      {hasAmount && (
        <VStack spacing={2} alignItems="start">
          <Text variant="label">{title}</Text>
          <HStack>
            <Text variant="subtitle" fontWeight={700}>
              {truncateDecimals(saleAmount, 5)} SOL
            </Text>
            <Text variant="subtitle" color="whiteAlpha.500">
              / ${truncateDecimals(usd, 2)}
            </Text>
          </HStack>
        </VStack>
      )}
    </HStack>
  );
};
