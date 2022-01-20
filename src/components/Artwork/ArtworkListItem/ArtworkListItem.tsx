import { HStack, StackDivider } from "@chakra-ui/react";
import { ArtworkListItemActions } from "./ArtworkListItemActions";
import { ArtworkListItemHeader } from "./ArtworkListItemHeader";
import { ArtworkStats } from "../shared";
import React, { useCallback } from "react";
import { ArtworkCardVariant, IArt } from "state/artworks";

interface Props {
  artwork: IArt;
  variant?: ArtworkCardVariant;
  selected?: boolean;
  onSelect?: (artwork: IArt) => void;
  onNewEdition?: (artwork: IArt) => void;
  onSell?: (artwork: IArt) => void;
  onRemove?: (artwork: IArt) => void;
}

export const ArtworkListItem: React.FC<Props> = ({
  artwork,
  variant,
  ...props
}) => {
  const { image, title } = artwork;
  const type = artwork.type;

  const onNewEdition = useCallback(() => {
    props.onNewEdition?.(artwork);
  }, [props.onNewEdition, artwork]);

  const onSell = useCallback(() => {
    props.onSell?.(artwork);
  }, [props.onSell, artwork]);

  const onRemove = useCallback(() => {
    props.onRemove?.(artwork);
  }, [props.onRemove, artwork]);

  return (
    <HStack bg="gray.800" spacing={4} p={4} borderRadius="xl" mb={4}>
      <HStack
        spacing={4}
        align="stretch"
        w="100%"
        divider={<StackDivider borderColor="whiteAlpha.100" />}
      >
        <ArtworkListItemHeader imgUrl={image} name={title} type={type} />
        <ArtworkStats
          supply={artwork.prints?.supply}
          maxSupply={artwork.prints?.maxSupply}
          variant={variant}
        />
      </HStack>
      <ArtworkListItemActions
        newEdition={onNewEdition}
        sell={onSell}
        remove={onRemove}
        variant={variant}
      />
    </HStack>
  );
};
