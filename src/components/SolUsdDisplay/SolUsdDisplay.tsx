import { Circle, HStack, StackProps, Text } from "@chakra-ui/react";
import { SolanaIcon } from "components/Icons";
import { truncateDecimals } from "utils/truncateDecimals";

interface SolUsdDisplayProps extends StackProps {
  sol?: number | null;
  usd?: number | null;
}

export const SolUsdDisplay: React.FC<SolUsdDisplayProps> = ({
  sol = 0,
  usd = 0,
  ...props
}) => (
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
