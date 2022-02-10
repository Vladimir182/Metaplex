import { HStack, StackDivider } from "@chakra-ui/react";
import React from "react";

import { ArtworkCardVariant, IArt } from "state/artworks";
import { ArtworkListItemStatus } from "./ArtworkListItemStatus";
import { ArtworkListItemActions } from "./ArtworkListItemActions";
import { ArtworkListItemHeader } from "./ArtworkListItemHeader";
import { ArtworkListItemSaleAmount } from "./ArtworkListItemSaleAmount";
import { ArtworkStats } from "../shared";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/types";

interface Props {
  artwork: IArt;
  variant?: ArtworkCardVariant;
}

export const ArtworkListItem: React.FC<Props> = ({ artwork, variant }) => {
  const { image, title, endDate, state = MarketState.Uninitialized } = artwork;

  const type = artwork.type;
  const isExhaustedMints = artwork.prints?.supply === artwork.prints?.maxSupply;
  const hasAmount = typeof artwork.primarySaleAmount !== "undefined";

  return (
    <HStack bg="gray.800" spacing={4} p={4} borderRadius="xl" mb={4}>
      <HStack
        spacing={4}
        align="middle"
        w="calc(100% - 140px)"
        divider={<StackDivider borderColor="whiteAlpha.100" />}
      >
        <ArtworkListItemHeader imgUrl={image} name={title} type={type} />
        <ArtworkStats
          supply={artwork.prints?.supply}
          maxSupply={artwork.prints?.maxSupply}
          variant={variant}
        />

        {hasAmount && (
          <ArtworkListItemSaleAmount
            title="Primary Sale"
            saleAmount={artwork.primarySaleAmount}
          />
        )}

        <ArtworkListItemStatus state={state} />
      </HStack>
      <ArtworkListItemActions
        id={artwork.id}
        state={state}
        endDate={endDate}
        isExhaustedMints={isExhaustedMints}
      />
    </HStack>
  );
};
