import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale";
import { ROUTES } from "routes";
import { IArt } from "state/artworks";
import { IFixedPrice } from "state/sales";
import { useLocalState } from "views/HomePage/components/TokensList/state";

interface ActionsProps {
  artwork: IArt;
  sale?: IFixedPrice;
  isSoldOut?: boolean;
}

export const Actions: React.FC<ActionsProps> = ({
  artwork,
  sale,
  isSoldOut,
}) => {
  const { onWithdraw } = useLocalState();

  const { isWithdrawn, state, endDate } = sale || {};

  const shouldRenderSell =
    (state === MarketState.Uninitialized || !state) && !isSoldOut;
  const shouldRenderEndSale = state === MarketState.Active && !endDate;
  const shouldRenderWithdraw = state === MarketState.Ended && !isWithdrawn;

  const handleWithdraw = useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();

      if (sale) {
        onWithdraw(sale);
      }
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
          to={ROUTES.createSale({ ":itemId": artwork.accountAddress })}
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
