import type { SystemStyleObject } from "@chakra-ui/theme-tools";
import { Text } from "./Text";

const baseStyleText: SystemStyleObject = {
  ...Text.variants.subtitle,
  color: "pink.500",
  mt: 2,
  mx: 5,
};

const baseStyleIcon: SystemStyleObject = {
  marginEnd: "0.5em",
  color: "pink.500",
};

export const FormError = {
  baseStyle: {
    text: baseStyleText,
    icon: baseStyleIcon,
  },
};
