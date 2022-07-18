import { HStack, StackProps, Text, TextProps } from "@chakra-ui/layout";

interface Props extends StackProps {
  icon?: React.ReactElement;
  active?: boolean;
  textProps?: TextProps;
}

export const StepListItem: React.FC<Props> = ({
  icon,
  children,
  active,
  textProps,
  ...props
}) => (
  <HStack
    p={4}
    bgColor={active ? "whiteAlpha.100" : undefined}
    borderRadius="lg"
    spacing={6}
    {...props}
  >
    {icon}
    <Text
      variant="button"
      color={active ? undefined : "whiteAlpha.700"}
      {...textProps}
    >
      {children}
    </Text>
  </HStack>
);
