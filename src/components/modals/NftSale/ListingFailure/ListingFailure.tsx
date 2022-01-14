import { Circle, Flex, FlexProps, Heading, Text } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import { MdErrorOutline } from "react-icons/md";
import { fontSizes } from "theme/typography";

interface ListingSuccessProps extends FlexProps {
  title?: string;
  bodyText?: string;
  onDismiss?: () => void;
}

export const ListingFailure: React.FC<ListingSuccessProps> = ({
  title,
  bodyText,
  onDismiss,
  ...props
}) => {
  return (
    <Flex direction="column" align="center" {...props}>
      <Circle bgColor="whiteAlpha.100" boxSize="64px" mb={8}>
        <MdErrorOutline size={fontSizes["2xl"]} />
      </Circle>
      <Heading variant="h4" mb={3}>
        {title}
      </Heading>
      <Text variant="body-large" color="whiteAlpha.700">
        {bodyText}
      </Text>
      <Button onClick={onDismiss} variant="primary" size="lg" mt={12}>
        Dismiss
      </Button>
    </Flex>
  );
};
