import { Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { FC } from "react";
import backgroundImage from "./wallet-not-connected-background.png";

export const WalletNotConnected: FC = () => {
  return (
    <Flex direction="column" align="center" justify="center" flexGrow={1}>
      <Image w={416} h={214} src={backgroundImage} />
      <Heading variant="h3" my={4}>
        Let’s setup your Storefront
      </Heading>
      <Text mb={10}>
        No technical setup or coding required and takes less than 5 minutes. A
        wallet can only have one Storefront at the moment. Connect your wallet
        to get started. <Link href="#">Learn more</Link>
      </Text>
      <WalletModalProvider>
        <WalletMultiButton style={{ height: 56 }} />
      </WalletModalProvider>
    </Flex>
  );
};
