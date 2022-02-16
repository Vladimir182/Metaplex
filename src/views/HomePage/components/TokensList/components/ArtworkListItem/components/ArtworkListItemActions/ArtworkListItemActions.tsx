import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/types";
import { ROUTES } from "routes";
import { useCallback } from "react";
import dayjs from "dayjs";

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
  const { onCloseMarket, onWithdraw, onClaim } = useLocalState();

  const shouldRenderSell =
    state === MarketState.Uninitialized && !isExhaustedMints;
  const shouldRenderEndSale =
    !endDate && [MarketState.Active, MarketState.Created].includes(state);
  const shouldRenderWithdraw =
    state === MarketState.Ended && !artwork.isWithdrawn;
  const shouldRenderClaim = state === MarketState.Ended && artwork.isWithdrawn;

  const handleCloseMarket = useCallback(() => {
    if (!artwork?.market) return;

    onCloseMarket(artwork.market);
  }, [artwork, onCloseMarket]);

  const handleWithdraw = useCallback(() => {
    if (!artwork?.market) return;

    onWithdraw({ market: artwork.market, metadata: artwork.id });
  }, [artwork, onWithdraw]);

  const handleClaim = useCallback(() => {
    if (!artwork?.market) return;

    onClaim({
      market: artwork.market,
      metadata: artwork.id,
      claimedImg: artwork.image,
    });
  }, [artwork, onClaim]);

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
        >
          Sell Tokens
        </Button>
      )}

      {shouldRenderEndSale && (
        <Button variant="tertiary" onClick={handleCloseMarket}>
          End Sale
        </Button>
      )}

      {shouldRenderWithdraw && (
        <Button variant="primary" onClick={handleWithdraw}>
          Withdraw
        </Button>
      )}

      {shouldRenderClaim && (
        <Button variant="solid" onClick={handleClaim}>
          Claim Token
        </Button>
      )}
    </HStack>
  );
};
