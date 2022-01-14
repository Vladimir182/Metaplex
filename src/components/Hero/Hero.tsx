import {
  FlexProps,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ConditionalWrapper } from "components/utility/ConditionalWrapper";
import { DesktopHeroWrapper } from "./DesktopHeroWrapper";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props extends FlexProps {
  title: string;
  text: string;
  logo?: string;
  coverImage?: string;
}

export const Hero: React.FC<Props> = ({
  title,
  text,
  logo,
  coverImage,
  children,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <ConditionalWrapper
      wrap={mdUp}
      wrapper={(wrapperChildren) => (
        <DesktopHeroWrapper coverImage={coverImage} {...props}>
          {wrapperChildren}
        </DesktopHeroWrapper>
      )}
    >
      <VStack align="start" spacing={mdUp ? 8 : 6} mb={!mdUp ? 6 : undefined}>
        {!mdUp && (
          <Image
            src={coverImage}
            w="calc(100% + 48px)"
            maxW="calc(100% + 48px)"
            h={375}
            objectFit="cover"
            ml={-6}
          />
        )}
        {logo && <Image src={logo} maxW={175} maxH={175} objectFit="cover" />}
        <VStack align="start">
          <Heading variant={mdUp ? "h2" : "h3"}>{title}</Heading>
          <Text variant={mdUp ? "body-large" : "subtitle-2"}>{text}</Text>
        </VStack>
        {children && (
          <HStack spacing={4} mt={8} w="full">
            {children}
          </HStack>
        )}
      </VStack>
    </ConditionalWrapper>
  );
};
