import { Button, HStack, VStack, StackProps } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MdAdd } from "react-icons/md";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";

interface Props extends StackProps {
  sol?: number | null;
  usd?: number | null;
  title?: string;
}

export const Balance: React.FC<Props> = ({
  sol,
  usd,
  title = "Balance",
  ...props
}) => {
  const { disconnect } = useWallet();

  return (
    <VStack spacing={4} px={4} w="full" {...props}>
      <TitledBlock title={title} variant="sm" w="full">
        <SolUsdDisplay sol={sol} usd={usd} />
      </TitledBlock>

      <HStack w="full">
        <Button leftIcon={<MdAdd />} flexGrow={1}>
          Add Funds
        </Button>
        <Button onClick={disconnect} variant="tertiary" flexGrow={1}>
          Disconnect
        </Button>
      </HStack>
    </VStack>
  );
};
