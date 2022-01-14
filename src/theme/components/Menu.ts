import { menuAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";
import { Text } from "./Text";

const baseStyleList: SystemStyleObject = {
  bg: "gray.700",
  p: "2",
  zIndex: 1,
  borderRadius: "xl",
  borderWidth: "0",
};

const baseStyleItem: SystemStyleObject = {
  ...Text.variants.subtitle,
  p: "2",
  borderRadius: "base",
  color: "whiteAlpha.700",
  fontWeight: "bold",
  _hover: {
    bg: "whiteAlpha.100",
    color: "white",
  },
  _focus: {
    bg: "whiteAlpha.500",
    color: "white",
  },
  _active: {
    bg: "whiteAlpha.700",
    color: "white",
  },
  _expanded: {
    bg: "whiteAlpha.500",
    color: "white",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

const baseStyleDivider: SystemStyleObject = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "whiteAlpha.100",
  my: "0.5rem",
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  list: baseStyleList,
  item: baseStyleItem,
  divider: baseStyleDivider,
});

export const Menu = {
  parts: parts.keys,
  baseStyle,
};
