import { Circle, Flex, FlexProps, Heading, Text } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import { MdErrorOutline } from "react-icons/md";
import { fontSizes } from "theme/typography";

interface ListingSuccessProps extends FlexProps {
  bodyText?: string;
  onDismiss?: () => void;
}

export const TransactionFailure: React.FC<ListingSuccessProps> = ({
  bodyText,
  onDismiss,
  ...props
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      spacing={6}
      p="77px 48px 23px"
      {...props}
    >
      <Circle bgColor="pink.500" boxSize="64px" mb={8}>
        <MdErrorOutline size={fontSizes["2xl"]} color="#EB3AAF" />
      </Circle>
      <Heading variant="h4" mb={3}>
        Transaction Error
      </Heading>
      <Text
        variant="body-large"
        color="whiteAlpha.700"
        textAlign="center"
        fontSize={16}
      >
        {bodyText}
      </Text>
      <Flex direction="column">
        <Button onClick={onDismiss} variant="ghost" size="lg" mt={2}>
          Dismiss
        </Button>
      </Flex>
    </Flex>
  );
};
