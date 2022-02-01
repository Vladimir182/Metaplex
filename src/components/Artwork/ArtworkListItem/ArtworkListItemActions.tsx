import { Button, HStack } from "@chakra-ui/react";
import { MarketState } from "@metaplex-foundation/mpl-membership-token/dist/src/types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { ROUTES } from "routes";

interface Props {
  id: string;
  state: MarketState;
  endDate?: dayjs.Dayjs;
}

export const ArtworkListItemActions: React.FC<Props> = ({
  id,
  state,
  endDate,
}) => {
  const endSale = (): void => {
    //
  };

  const shouldRenderSell = [MarketState.Uninitialized].includes(state);

  const shouldRenderEndSale =
    !endDate && [MarketState.Active, MarketState.Created].includes(state);

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
          to={ROUTES.createSale({ ":itemId": id })}
        >
          Sell Tokens
        </Button>
      )}

      {shouldRenderEndSale && (
        <Button variant="tertiary" onClick={endSale}>
          End Sale
        </Button>
      )}
    </HStack>
  );
};
