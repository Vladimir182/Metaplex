import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
  coverImage?: string;
}

export const DesktopHeroWrapper: React.FC<Props> = ({
  coverImage,
  children,
  ...props
}) => {
  return (
    <Flex
      align="center"
      borderRadius="lg"
      h={528}
      minH={528}
      w="full"
      maxW={1600}
      mx="auto"
      p={12}
      pr="40%"
      bgColor="black"
      bgImage={`linear-gradient(to right, #121212, rgba(0, 0, 0, 0)), url("${
        coverImage ?? ""
      }")`}
      backgroundSize="cover"
      backgroundPosition="center center"
      {...props}
    >
      {children}
    </Flex>
  );
};
