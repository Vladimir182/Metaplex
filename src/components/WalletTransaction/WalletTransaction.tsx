import { Stack, StackProps, Box, Divider } from "@chakra-ui/react";

import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface WalletTransactionProps extends StackProps {
  sol?: number;
  usd?: number;
  title?: string;
  walletBalance?: number;
}

export const WalletTransaction: React.FC<WalletTransactionProps> = ({
  sol,
  usd,
  title = "Price",
  children,
  walletBalance,
  ...rest
}) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <Stack
      align="stretch"
      borderRadius={12}
      bgColor="whiteAlpha.100"
      padding={5}
      spacing={4}
      {...rest}
    >
      <TitledBlock title="YOUR BALANCE">
        <SolUsdDisplay sol={walletBalance} />
      </TitledBlock>

      <Divider />

      <Stack
        direction={mdUp ? "row" : "column"}
        spacing={4}
        borderRadius={6}
        bgColor="gray.700"
        align={mdUp ? "center" : "stretch"}
        justify="space-between"
        {...rest}
      >
        <TitledBlock title={title} w="full">
          <SolUsdDisplay sol={sol} usd={usd} />
        </TitledBlock>
        <Box w="ful">{children}</Box>
      </Stack>
    </Stack>
  );
};
