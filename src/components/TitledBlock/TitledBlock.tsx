import { ReactNode } from "react";
import { Flex, FlexProps, Text } from "@chakra-ui/react";

interface TitledBlockProps extends FlexProps {
  title: string;
  subtitle?: string | string[];
  content?: ReactNode;
  variant?: "xs" | "sm" | "md" | "lg";
}

const spacing = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
};

export const TitledBlock: React.FC<TitledBlockProps> = (props) => {
  const {
    title,
    subtitle,
    content,
    children,
    variant = "md",
    fontWeight,
    ...rest
  } = props;
  const isXs = variant === "xs";

  const subtitleString = Array.isArray(subtitle)
    ? subtitle.join("\n")
    : subtitle;

  return (
    <Flex align="stretch" direction="column" {...rest}>
      <Text
        fontWeight={fontWeight}
        variant={isXs ? "small" : "label"}
        mb={subtitleString ? 1 : spacing[variant]}
        color="white"
      >
        {title}
      </Text>
      {subtitleString && (
        <Text
          variant="subtitle"
          color="whiteAlpha.500"
          whiteSpace="pre-wrap"
          mb={spacing[variant]}
        >
          {subtitleString}
        </Text>
      )}
      {content ? content : children}
    </Flex>
  );
};
