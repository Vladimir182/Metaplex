import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import { ModalFootnote } from "../ModalFootnote";
import { Spinner } from "./Spinner";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

export interface LoaderProps {
  title?: string;
  subtitle?: string;
  noteIcon?: ReactNode;
  noteText?: ReactNode;
  darkBg?: boolean;
}

export const LoaderComponent: FC<LoaderProps> = ({
  title,
  subtitle,
  noteIcon,
  noteText,
  darkBg,
}) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <Flex direction="column" flexGrow={1}>
      <Center
        w="full"
        h="250px"
        flexDirection="column"
        flexGrow={1}
        px={mdUp ? 16 : 0}
        my={mdUp ? 16 : 6}
      >
        <Spinner darkBg={darkBg} mb={12} />
        <Heading variant="h4" mb={1} align="center">
          {title}
        </Heading>
        <Text align="center" color="whiteAlpha.700">
          {subtitle}
        </Text>
      </Center>
      <ModalFootnote icon={noteIcon} text={noteText} />
    </Flex>
  );
};
