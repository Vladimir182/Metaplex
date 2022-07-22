import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { ROUTES } from "routes";
import { IArt } from "state/artworks";
import { IFixedPrice, SaleState } from "state/sales";
import { getArtworkState } from "utils/getArtworkState";
import { useLocalState } from "views/HomePage/components/TokensList/state";

interface ActionsProps {
  artwork: IArt;
  state?: SaleState;
  sale?: IFixedPrice;
}

export const Actions: React.FC<ActionsProps> = ({
  artwork,
  sale,
  state = sale?.state || getArtworkState(artwork),
}) => {
  const { onWithdraw } = useLocalState();

  const { isWithdrawn = true, endDate } = sale || {};

  const shouldRenderSell = state === SaleState.Uninitialized || !state;
  const shouldRenderEndSale = !endDate && [SaleState.Active].includes(state);
  const shouldRenderWithdraw =
    (state === SaleState.Ended || state === SaleState.SoldOut) && !isWithdrawn;

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
