import { Box, Flex } from "@chakra-ui/react";

import { FC } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useScrollTrigger } from "./useScrollTrigger";
import { getPadding } from "./utils";

interface Props {
  focused?: boolean;
  narrow?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
  onScrollTrigger?: (trigger: boolean) => void;
}

export const LayoutContent: FC<Props> = ({
  focused,
  narrow,
  onScrollTrigger,
  children,
  fullHeight = false,
  noPadding = false,
}) => {
  useScrollTrigger(window ? window : null, { onTrigger: onScrollTrigger });
  const { mdUp } = useCustomBreakpoints();

  const paddingValue = getPadding(mdUp, noPadding);
  return (
    <Box flexGrow={1} position="relative">
      <Flex
        minH={fullHeight ? "100vh" : "auto"}
        direction="column"
        maxW={narrow ? "3xl" : "1600px"}
        marginX="auto"
        flexGrow={1}
        px={paddingValue}
        py={paddingValue}
        pt={focused || noPadding ? paddingValue : 88}
      >
        {children}
      </Flex>
    </Box>
  );
};
