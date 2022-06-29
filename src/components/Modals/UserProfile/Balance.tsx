import { useCallback } from "react";
import { Button, HStack, StackProps, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";

import { SolUsd } from "components/DataDisplay/SolUsd";
import { TitledBlock } from "components/DataDisplay/TitledBlock";

interface Props extends StackProps {
  sol?: number | null;
  title?: string;
}

export const Balance: React.FC<Props> = ({
  sol,
  title = "Balance",
  ...props
}) => {
  const { disconnect } = useWallet();

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <VStack spacing={4} px={4} w="full" {...props}>
      <TitledBlock title={title} variant="sm" w="full">
        <SolUsd sol={sol} />
      </TitledBlock>

      <HStack w="full">
        <Button onClick={handleDisconnect} variant="tertiary" flexGrow={1}>
          Disconnect
        </Button>
      </HStack>
    </VStack>
  );
};
