/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  PartsStyleInterpolation,
  PartsStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";

import { getColor } from "@chakra-ui/theme-tools";
import { tagAnatomy as parts } from "@chakra-ui/anatomy";

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      borderRadius: "full",
      px: 2,
      py: 1,
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem",
    },
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      fontWeight: "bold",
      borderRadius: "full",
      px: 4,
      py: 2,
    },
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      fontWeight: "bold",
      borderRadius: "full",
      px: 6,
      py: 3,
    },
  },
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;
  const color = getColor(theme, `${c}.700`);
  const borderColor = getColor(theme, `${c}.100`);

  return {
    color,
    /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
    boxShadow: `inset 0 0 0px 1px ${borderColor}`,
  };
};

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  outline: (props) => ({ container: variantOutline(props) }),
  filled: {
    container: {
      bgColor: "whiteAlpha.50",
      boxShadow: "0px 0px 24px rgba(26, 26, 26, 0.12)",
      color: "whiteAlpha.700",
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "outline",
  colorScheme: "whiteAlpha",
};

export const Tag = {
  defaultProps,
  sizes,
  variants,
};
