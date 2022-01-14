import { Box, Flex } from "@chakra-ui/react";

import { FC } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useScrollTrigger } from "./useScrollTrigger";

interface Props {
  focused?: boolean;
  narrow?: boolean;
  onScrollTrigger?: (trigger: boolean) => void;
}

export const LayoutContent: FC<Props> = ({
  focused,
  narrow,
  onScrollTrigger,
  children,
}) => {
  useScrollTrigger(window ? window : null, { onTrigger: onScrollTrigger });
  const { mdUp } = useCustomBreakpoints();

  const paddingValue = mdUp ? 12 : 6;

  return (
    <Box flexGrow={1} position="relative">
      <Flex
        direction="column"
        maxW={narrow ? "3xl" : "1600px"}
        marginX="auto"
        flexGrow={1}
        px={paddingValue}
        py={paddingValue}
        pt={focused ? paddingValue : 88}
      >
        {children}
      </Flex>
    </Box>
  );
};
