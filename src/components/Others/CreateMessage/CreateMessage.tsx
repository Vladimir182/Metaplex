import { FC } from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";

import backgroundImage from "./wallet-not-connected-background.png";

export const CreateMessage: FC = ({ children }) => {
  return (
    <Flex direction="column" align="center" justify="center" flexGrow={1}>
      <Image mt={14} w={416} h={214} src={backgroundImage} />
      <Heading variant="h3" my={4}>
        Let’s setup your management console
      </Heading>
      <Text mb={10} maxW="xl" align="center" color="whiteAlpha.500">
        No technical setup or coding required and takes less than 5 minutes. A
        wallet can only have one management console at the moment. Connect your
        wallet to get started
      </Text>
      {children}
    </Flex>
  );
};
