import { SystemStyleFunction } from "@chakra-ui/theme-tools";

const variantSolid: SystemStyleFunction = () => {
  return {
    bg: "white",
    color: "#121212",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    px: 3,
    borderRadius: "full",
    height: 6,
    fontSize: "sm",
  };
};

const variants = {
  solid: variantSolid,
};

const defaultProps = {
  variant: "solid",
  colorScheme: "whiteAlpha",
};

export const Badge = {
  variants,
  defaultProps,
};
