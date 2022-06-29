import { Circle, HStack, StackProps, Text } from "@chakra-ui/react";
import { useSolToUsd } from "state/react/useSolToUsd";
import { truncateDecimals } from "utils/truncateDecimals";

import { SolanaIcon } from "components/Icons";

interface SolUsdProps extends StackProps {
  sol?: number | null;
}

export const SolUsd: React.FC<SolUsdProps> = ({ sol = 0, ...props }) => {
  const usd = useSolToUsd(sol);

  return (
    <HStack {...props}>
      <Circle bg="whiteAlpha.50">
        <SolanaIcon boxSize="1.5em" />
      </Circle>
      <Text variant="button" fontWeight={700}>
        {truncateDecimals(sol, 5)} SOL
      </Text>
      <Text variant="button" color="whiteAlpha.500">
        ${truncateDecimals(usd, 2)}
      </Text>
    </HStack>
  );
};
