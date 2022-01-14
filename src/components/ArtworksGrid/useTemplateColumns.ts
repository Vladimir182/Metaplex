import { useBreakpointValue } from "@chakra-ui/react";

export const useTemplateColumns = () => {
  const currentBreakpoint = useBreakpointValue({
    base: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  switch (currentBreakpoint) {
    case "xs":
      return "minmax(0, 1fr)";
    case "sm":
      return "1fr";
    case "md":
      return "repeat(auto-fill, minmax(300px, 1fr))";
    case "lg":
      return "repeat(auto-fill, minmax(300px, 1fr))";
    case "xl":
      return "repeat(auto-fill, minmax(300px, 1fr))";
    default:
      return "repeat(auto-fill, minmax(300px, 1fr))";
  }
};
