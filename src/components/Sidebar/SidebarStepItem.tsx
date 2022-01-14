import { HStack, Text } from "@chakra-ui/layout";

interface Props {
  icon?: React.ReactElement;
  active?: boolean;
}

export const SidebarStepItem: React.FC<Props> = ({
  icon,
  children,
  active,
}) => (
  <HStack
    p={4}
    bgColor={active ? "whiteAlpha.100" : undefined}
    borderRadius="lg"
  >
    {icon}
    <Text variant="button" color={active ? undefined : "whiteAlpha.700"}>
      {children}
    </Text>
  </HStack>
);
