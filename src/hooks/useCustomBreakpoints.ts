import { useMediaQuery } from "@chakra-ui/react";

export const useCustomBreakpoints = () => {
  const [smUp, mdUp, lgUp, xlUp, customXlUp, xxlUp] = useMediaQuery([
    "(min-width: 640px)",
    "(min-width: 768px)",
    "(min-width: 1024px)",
    "(min-width: 1280px)",
    "(min-width: 1365px)",
    "(min-width: 1921px)",
  ]);

  return {
    xlUp,
    customXlUp,
    lgUp,
    mdUp,
    smUp,
    xxlUp,
    smDown: !mdUp,
  };
};
