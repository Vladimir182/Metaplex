import {
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StyleProps,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { $user } from "state/wallet";
import { Circle } from "@chakra-ui/layout";
import React from "react";
import { RepeatIcon } from "components/Icons";
import imgPhantom from "./images/phantom.png";
import imgPhantomIcon from "./images/phantom-icon.png";
import imgPhantomWallet from "./images/phantom-wallet.png";
import imgStreetDreams from "./images/street-dreams.svg";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useStore } from "effector-react";

interface Props extends StyleProps {
  storeName: string;
  variant?: "page" | "modal";
}

export const HowToBuy: React.FC<Props> = ({
  storeName,
  variant = "modal",
  ...props
}) => {
  const { mdUp, lgUp } = useCustomBreakpoints();
  const user = useStore($user);

  const isModal = variant === "modal";
  const containerPadding = mdUp ? 12 : 6;

  return (
    <Center
      layerStyle={isModal ? "base" : undefined}
      p={isModal ? containerPadding : 0}
      {...props}
    >
      <Stack
        direction={lgUp ? "row" : "column"}
        spacing={isModal ? 12 : 8}
        alignItems="flex-start"
      >
        <VStack
          spacing={6}
          maxW="352px"
          flexBasis="352px"
          layerStyle={isModal ? undefined : "base"}
        >
          <Center h="240px" layerStyle="base" bgColor="whiteAlpha.100">
            <Image src={imgPhantom} />
          </Center>
          <VStack spacing={2} alignSelf="start" alignItems="start">
            <Heading variant="h5">Create a SOL wallet.</Heading>
            <Text variant="body-short" color="whiteAlpha.700">
              SOL is the cryptocurrency we use for purchases on Street Dreams.
              To keep your SOL safe, you’ll need a crypto wallet—we recommend
              using one called Phantom. Just head to Phantom’s site, install the
              Chrome extension, and create an account.
            </Text>
          </VStack>
        </VStack>

        <VStack
          spacing={6}
          maxW="352px"
          flexBasis="352px"
          layerStyle={isModal ? undefined : "base"}
        >
          <Center h="240px" layerStyle="base" bgColor="whiteAlpha.100">
            <Image src={imgPhantomWallet} />
          </Center>
          <VStack spacing={2} alignSelf="start" alignItems="start">
            <Heading variant="h5">Add funds to your wallet.</Heading>
            <Text variant="body-short" color="whiteAlpha.700">
              To fund your wallet, you’ll need to purchase SOL tokens. The
              easiest way is with a credit card on FTX Pay—a service that’s
              already part of your new Phantom wallet. Open your wallet, tap
              “Deposit SOL”, and select “Deposit from FTX”. A new window will
              open where you can create an FTX account and purchase SOL.
            </Text>
          </VStack>
        </VStack>

        <Flex flexDir="column" layerStyle={isModal ? undefined : "base"}>
          <VStack spacing={6} maxW="352px" flexBasis="352px">
            <Center
              h="240px"
              layerStyle="base"
              bgColor="whiteAlpha.100"
              w="full"
            >
              <HStack spacing={6}>
                <Circle bgColor="whiteAlpha.50" size="84px">
                  <Image src={imgPhantomIcon} w="50px" h="50px" />
                </Circle>
                <RepeatIcon />
                <Circle bgColor="whiteAlpha.50" size="84px">
                  <Image src={imgStreetDreams} w="50px" h="50px" />
                </Circle>
              </HStack>
            </Center>
            <VStack spacing={2} alignSelf="start" alignItems="start">
              <Heading variant="h5">
                Connect your wallet to {storeName} and place a bid.
              </Heading>
              <Text variant="body-short" color="whiteAlpha.700">
                To connect your wallet, tap “Connect Wallet” here on the site.
                Select the Phantom option, and your wallet will connect. After
                that, you can start bidding on NFTs.
              </Text>
            </VStack>
          </VStack>

          {user == null && (
            <Box
              alignSelf={lgUp ? "flex-end" : "flex-start"}
              mt={mdUp ? 7 : 12}
            >
              <WalletModalProvider>
                <WalletMultiButton />
              </WalletModalProvider>
            </Box>
          )}
        </Flex>
      </Stack>
    </Center>
  );
};
