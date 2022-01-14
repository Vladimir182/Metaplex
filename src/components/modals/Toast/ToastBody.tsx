import { HStack, Text } from "@chakra-ui/react";

import { FC } from "react";

interface Props {
  text?: string;
}

export const ToastBody: FC<Props> = ({ text, children }) => (
  <HStack justify="space-between" spacing={4}>
    <Text>{text}</Text>
    {children}
  </HStack>
);
