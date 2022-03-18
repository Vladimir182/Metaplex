import { useMediaQuery } from "@chakra-ui/react";

export const useCustomBreakpoints = () => {
  const [smUp, mdUp, lgUp, xlUp, xxlUp] = useMediaQuery([
    "(min-width: 640px)",
    "(min-width: 768px)",
    "(min-width: 1024px)",
    "(min-width: 1280px)",
    "(min-width: 1921px)",
  ]);

  return {
    xlUp,
    lgUp,
    mdUp,
    smUp,
    xxlUp,
    smDown: !mdUp,
  };
};
