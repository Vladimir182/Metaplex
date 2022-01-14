import { HStack, StackDivider, VStack } from "@chakra-ui/react";
import { ArtworkListItemActions } from "./ArtworkListItemActions";
import { ArtworkListItemHeader } from "./ArtworkListItemHeader";
import { ArtworkStats } from "../shared";
import React, { useCallback } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { artHelpers, ArtworkCardVariant, IArt } from "state/artworks";
import { useSolToUsd } from "state/react/useCurrency";

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
  selected,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();

  const enableActions = variant !== "select";

  const { image, title } = artwork;
  const date = artHelpers.getDate(artwork);
  const sol = artHelpers.getPrice(artwork);
  const type = artwork.type;
  const editions = artHelpers.getEditions(artwork);
  const { convert } = useSolToUsd();
  const priceUSD = convert(sol);

  const onSelect = useCallback(() => {
    props.onSelect?.(artwork);
  }, [props.onSelect, artwork]);
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
    <VStack
      onClick={onSelect}
      bg="gray.800"
      spacing={4}
      p={4}
      layerStyle={selected ? "active" : "base"}
      borderRadius="xl"
      divider={<StackDivider borderColor="whiteAlpha.100" />}
    >
      <HStack
        spacing={4}
        align="stretch"
        w="100%"
        divider={
          mdUp ? <StackDivider borderColor="whiteAlpha.100" /> : undefined
        }
      >
        <ArtworkListItemHeader imgUrl={image} name={title} type={type} />
        {mdUp && (
          <ArtworkStats
            date={date}
            editions={editions ?? ""}
            supplyType="limited"
            sol={sol ?? 0}
            usd={priceUSD ?? 0}
            variant={variant}
          />
        )}
        {enableActions && (
          <ArtworkListItemActions
            newEdition={onNewEdition}
            sell={onSell}
            remove={onRemove}
            variant={variant}
          />
        )}
      </HStack>
      {!mdUp && (
        <ArtworkStats
          sol={sol ?? 0}
          usd={priceUSD ?? 0}
          variant={variant}
          date={date}
          editions={editions}
          supplyType="limited"
          w="100%"
          justifyContent="space-between"
        />
      )}
    </VStack>
  );
};
