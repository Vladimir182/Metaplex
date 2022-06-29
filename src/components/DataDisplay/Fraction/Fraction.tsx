import { BoxProps, HStack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props extends BoxProps {
  current: number | string;
  total: number | string;
  variant?: "normal" | "chip" | "short";
}

export const Fraction: React.FC<Props> = ({
  current,
  total,
  variant = "normal",
  ...rest
}) => {
  const { smUp } = useCustomBreakpoints();

  if (variant === "short") {
    return (
      <Tag {...rest} px={smUp ? 4 : 3}>
        <Text variant={smUp ? "subtitle" : "small"}>{total}</Text>
      </Tag>
    );
  }

  return variant === "normal" ? (
    <HStack spacing={1} fontWeight="bold" {...rest}>
      <Text variant="body">{current}</Text>
      <Text variant="body" color="whiteAlpha.700">
        /
      </Text>
      <Text variant="body" color="whiteAlpha.700">
        {total}
      </Text>
    </HStack>
  ) : (
    <Tag {...rest} px={smUp ? 4 : 3}>
      <Text
        variant={smUp ? "subtitle" : "small"}
      >{`${current} of ${total}`}</Text>
    </Tag>
  );
};
