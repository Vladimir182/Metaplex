import { Box, HStack, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  text?: ReactNode;
}

export const ModalFootnote: FC<Props> = ({ icon, text }) => {
  if (!text) return null;

  return (
    <HStack spacing={6} bgColor="whiteAlpha.50" px={6} py={3} borderRadius="lg">
      {icon && <Box color="whiteAlpha.700">{icon}</Box>}
      <Text color="whiteAlpha.700">{text}</Text>
    </HStack>
  );
};
