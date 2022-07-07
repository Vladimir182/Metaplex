import React, { useMemo } from "react";
import { BoxProps, Tag, Text } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { IPrintNumbers } from "state/artworks";

type VariantType = "normal" | "short";
export interface SupplyDetailsProps extends BoxProps, IPrintNumbers {
  variant?: VariantType;
}

export const SupplyDetails: React.FC<SupplyDetailsProps> = ({
  edition,
  maxSupply,
  supply,
  variant = "normal",
  ...rest
}) => {
  const { smUp } = useCustomBreakpoints();
  const displayedTitle = useMemo(() => {
    if (typeof supply === "undefined") return;
    if (edition) {
      return formatSupply(variant, edition, supply);
    }
    if (maxSupply === undefined) {
      return "Unlimited";
    }
    return formatSupply(variant, supply, maxSupply);
  }, [edition, maxSupply, supply, variant]);

  switch (variant) {
    case "normal":
      return (
        <Text fontWeight="bold" {...rest}>
          {displayedTitle}
        </Text>
      );
    case "short":
      return (
        <Tag {...rest} px={smUp ? 4 : 3}>
          <Text variant={smUp ? "subtitle" : "small"}>
            {maxSupply || "Unlimited"}
          </Text>
        </Tag>
      );
  }
};

const formatSupply = (variant: VariantType, first: number, second: number) => {
  const _first = Math.max(first, 0);
  const _second = Math.max(second, 1);
  switch (variant) {
    default:
      return `${_first} / ${_second}`;
  }
};
