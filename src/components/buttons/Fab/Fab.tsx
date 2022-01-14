import { Flex, FlexProps } from "@chakra-ui/layout";

export const Fab: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex
      {...rest}
      align="center"
      justify="center"
      w={12}
      h={12}
      borderRadius="full"
      bgColor="whiteAlpha.100"
      cursor="pointer"
      tabIndex={0}
      role="button"
    >
      {children}
    </Flex>
  );
};
