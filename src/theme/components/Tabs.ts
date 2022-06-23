/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  PartsStyleInterpolation,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";
import { getColor } from "@chakra-ui/theme-tools";

const baseStyleTab: SystemStyleFunction = () => {
  return {
    _focus: {
      zIndex: 1,
      boxShadow: "none",
      outline: "2px solid",
      outlineColor: "green.500",
      outlineOffset: "2px",
    },
  };
};

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  tab: baseStyleTab(props),
});

const variantSoftRounded: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props;
  return {
    tab: {
      borderRadius: "lg",
      fontWeight: "bold",
      color: `${c}.700`,
      _selected: {
        color: getColor(theme, "white"),
        bg: getColor(theme, `${c}.100`),
      },
    },
  };
};

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  "soft-rounded": variantSoftRounded,
};

const defaultProps = {
  size: "md",
  variant: "soft-rounded",
  colorScheme: "whiteAlpha",
};

export const Tabs = {
  baseStyle,
  variants,
  defaultProps,
};
