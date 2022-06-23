import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import dayjs from "dayjs";
import { ROUTES } from "routes";
import { IArt } from "state/artworks";

import { useLocalState } from "../../../../state";

interface Props {
  artwork: IArt;
  state: MarketState;
  endDate?: dayjs.Dayjs;
  isExhaustedMints?: boolean;
}

export const ArtworkListItemActions: React.FC<Props> = ({
  artwork,
  state,
  endDate,
  isExhaustedMints,
}) => {
  const { onWithdraw } = useLocalState();

  const shouldRenderSell =
    state === MarketState.Uninitialized && !isExhaustedMints;
  const shouldRenderEndSale = !endDate && [MarketState.Active].includes(state);
  const shouldRenderWithdraw =
    state === MarketState.Ended && !artwork.isWithdrawn;

  const handleWithdraw = useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      if (!artwork?.market) return;

      onWithdraw({
        market: artwork.market,
        metadata: artwork.id,
        artwork,
        claimedImg: artwork.image,
        state,
      });
    },
    [artwork, onWithdraw]
  );

  return (
    <HStack
      spacing={2}
      className="buttons"
      alignSelf="stretch"
      alignItems="center"
      ml="auto"
    >
      {shouldRenderSell && (
        <Button
          variant="tertiary"
          as={Link}
          to={ROUTES.createSale({ ":itemId": artwork.id })}
          onClick={(e) => e.stopPropagation()}
        >
          Sell Tokens
        </Button>
      )}

      {shouldRenderEndSale && (
        <Button variant="tertiary" onClick={handleWithdraw}>
          End Sale
        </Button>
      )}

      {shouldRenderWithdraw && (
        <Button variant="primary" onClick={handleWithdraw}>
          Withdraw
        </Button>
      )}
    </HStack>
  );
};
