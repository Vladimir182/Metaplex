import {
  DrawerCloseButton,
  DrawerHeader,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { MdArrowBack } from "react-icons/md";
import { MetaplexIcon } from "components/Icons";
import { fontSizes } from "theme/typography";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  secondaryView?: boolean;
  secondaryViewTitle?: string;
  onExitSecondaryView?: () => void;
}

export const MobileSidebarHeader: React.FC<Props> = ({
  secondaryView,
  secondaryViewTitle,
  onExitSecondaryView,
}) => {
  const { smDown } = useCustomBreakpoints();

  if (smDown) {
    return (
      <DrawerHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgColor="gray.700"
        position="sticky"
        px={secondaryView ? 3 : 6}
        top={0}
        zIndex="sticky"
      >
        {secondaryView ? (
          <>
            <IconButton
              aria-label="Back"
              onClick={onExitSecondaryView}
              variant="ghost"
              position="absolute"
              size="sm"
            >
              <MdArrowBack size={fontSizes["2xl"]} />
            </IconButton>
            <Text textAlign="center" w="100%">
              {secondaryViewTitle}
            </Text>
          </>
        ) : (
          <>
            <MetaplexIcon w={9} h={9} />
            <DrawerCloseButton position="unset" />
          </>
        )}
      </DrawerHeader>
    );
  }

  return null;
};
