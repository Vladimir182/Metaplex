import { Box, Flex } from "@chakra-ui/react";

interface Props {
  badgeContent: string | number | Element | React.ReactElement;
}

export const ArtworkBadge: React.FC<Props> = ({ children, badgeContent }) => {
  return (
    <Box
      as="span"
      position="relative"
      display="inline-flex"
      verticalAlign="middle"
      flexShrink={0}
    >
      {children}
      {!!badgeContent && (
        <Flex
          as="span"
          zIndex={1}
          boxSizing="border-box"
          position="absolute"
          right={0}
          bottom="40px"
          height="24px"
          px="6px"
          display="flex"
          alignItems="center"
          bgColor="green.500"
          borderRadius="full"
          color="rgb(255, 255, 255)"
          flexFlow="row wrap"
          w="40px"
          h="40px"
          placeContent="center"
          transformOrigin="100% 100%"
          transform="scale(1) translate(50%, 50%)"
          transition="transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
        >
          {badgeContent}
        </Flex>
      )}
    </Box>
  );
};
