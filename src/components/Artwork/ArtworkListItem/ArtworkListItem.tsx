import { HStack, StackDivider } from "@chakra-ui/react";
import React from "react";

import { ArtworkCardVariant, IArt } from "state/artworks";
import { ArtworkListItemStatus } from "./ArtworkListItemStatus";
import { ArtworkListItemActions } from "./ArtworkListItemActions";
import { ArtworkListItemHeader } from "./ArtworkListItemHeader";
import { ArtworkStats } from "../shared";
interface Props {
  artwork: IArt;
  variant?: ArtworkCardVariant;
}

export const ArtworkListItem: React.FC<Props> = ({ artwork, variant }) => {
  const { image, title, state } = artwork;
  const type = artwork.type;

  return (
    <HStack bg="gray.800" spacing={4} p={4} borderRadius="xl" mb={4}>
      <HStack
        spacing={4}
        align="middle"
        w="100%"
        divider={<StackDivider borderColor="whiteAlpha.100" />}
      >
        <ArtworkListItemHeader imgUrl={image} name={title} type={type} />
        <ArtworkStats
          supply={artwork.prints?.supply}
          maxSupply={artwork.prints?.maxSupply}
          variant={variant}
        />

        <ArtworkListItemStatus state={state} />
      </HStack>

      <ArtworkListItemActions id={artwork.id} />
    </HStack>
  );
};
