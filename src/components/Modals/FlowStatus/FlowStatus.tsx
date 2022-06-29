import { FC, ReactNode } from "react";
import { Center, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { ModalFootnote } from "../ModalFootnote";

export interface FlowStatusProps extends FlexProps {
  statusIcon?: ReactNode;
  title?: string;
  subtitle?: string | ReactNode;
  actions?: ReactNode;
  noteIcon?: ReactNode;
  noteText?: ReactNode;
}

export const FlowStatus: FC<FlowStatusProps> = ({
  statusIcon,
  title,
  subtitle,
  actions,
  noteIcon,
  noteText,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <Flex direction="column" flexGrow={1} {...props}>
      <Center
        w="full"
        h="250px"
        flexDirection="column"
        flexGrow={1}
        px={mdUp ? 16 : 0}
        my={mdUp ? 16 : 6}
      >
        {statusIcon}
        <Heading variant="h4" mt={9} mb={1} css={{ align: "center" }}>
          {title}
        </Heading>

        {typeof subtitle === "string" ? (
          <Text align="center" color="whiteAlpha.700">
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}

        <Flex mt={12}>{actions}</Flex>
      </Center>
      <ModalFootnote icon={noteIcon} text={noteText} />
    </Flex>
  );
};
