import { IArt } from "state/artworks";
import { IFixedPrice, isSale } from "state/sales";

interface GetArtworkActionsPropsResponse {
  artwork: IArt;
  isSoldOut: boolean;
  sale?: IFixedPrice;
}

const getArtworkActionsProps = (
  item: IFixedPrice | IArt
): GetArtworkActionsPropsResponse => {
  const artwork = isSale(item) ? item.artwork : item;

  const isSoldOut =
    !!artwork && artwork.prints?.supply === artwork.prints?.maxSupply;

  return {
    artwork,
    isSoldOut,
    ...(isSale(item) && { sale: item }),
  };
};

export default getArtworkActionsProps;
