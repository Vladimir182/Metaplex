import { useMediaQuery } from "@chakra-ui/react";

export const useCustomBreakpoints = () => {
  const [smUp, mdUp, lgUp, xlUp] = useMediaQuery([
    "(min-width: 640px)",
    "(min-width: 768px)",
    "(min-width: 1024px)",
    "(min-width: 1280px)",
  ]);

  return {
    xlUp,
    lgUp,
    mdUp,
    smUp,
    smDown: !mdUp,
  };
};
