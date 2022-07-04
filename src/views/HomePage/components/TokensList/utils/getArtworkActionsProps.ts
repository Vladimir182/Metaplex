import { IArt } from "state/artworks";
import { IFixedPrice, isSale } from "state/sales";

interface GetArtworkActionsPropsResponse {
  artwork: IArt;
  sale?: IFixedPrice;
}

const getArtworkActionsProps = (
  item: IFixedPrice | IArt
): GetArtworkActionsPropsResponse => {
  const artwork = isSale(item) ? item.artwork : item;

  return {
    artwork,
    ...(isSale(item) && { sale: item }),
  };
};

export default getArtworkActionsProps;
