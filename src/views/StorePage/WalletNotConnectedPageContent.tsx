import { $user } from "state/wallet";
import { FC } from "react";
import { HowToBuy } from "components/modals/HowToBuy";
import { useStore } from "effector-react";
import { Heading, Text } from "@chakra-ui/react";

export const WalletNotConnectedPageContent: FC = () => {
  const user = useStore($user);

  if (user) return null;

  return (
    <>
      <Heading variant="h3" mt={5} mb={2}>
        Get ready to collect.
      </Heading>
      <Text color="whiteAlpha.700" mb={8} maxW={520}>
        To buy NFTs on the Street Dreams marketplace, you'll need a SOL wallet.
        Here's how to set one up:
      </Text>
      <HowToBuy storeName="NYX" variant="page" />
    </>
  );
};
