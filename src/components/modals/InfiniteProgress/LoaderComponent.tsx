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
        h="220px"
        flexDirection="column"
        flexGrow={1}
        px={mdUp ? 10 : 0}
        my={mdUp ? 16 : 6}
      >
        <Spinner w="64px" h="64px" darkBg={darkBg} mb={10} />
        <Heading variant="h4" mb={3} align="center">
          {title}
        </Heading>
        <Text align="center">{subtitle}</Text>
      </Center>
      <ModalFootnote icon={noteIcon} text={noteText} />
    </Flex>
  );
};
