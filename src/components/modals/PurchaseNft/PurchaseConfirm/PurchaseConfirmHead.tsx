import { HStack, Heading, Image, VStack } from "@chakra-ui/react";
import { Person, PersonProps } from "components/Person";

import { FC } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  image?: string;
  title?: string;
  artist?: PersonProps;
}

export const PurchaseConfirmHead: FC<Props> = ({ image, title, artist }) => {
  const { mdUp } = useCustomBreakpoints();

  const imageSize = mdUp ? 187 : 100;

  return (
    <HStack alignItems="start" spacing={6}>
      <Image
        w={imageSize}
        h={imageSize}
        src={image}
        objectFit="contain"
        borderRadius="lg"
      />
      <VStack alignItems="start" spacing={4}>
        <Heading variant={mdUp ? "h3" : "h4"}>{title}</Heading>
        {artist && (
          <Person
            name={artist.name}
            address={artist.address}
            avatarUrl={artist.avatarUrl}
          />
        )}
      </VStack>
    </HStack>
  );
};
