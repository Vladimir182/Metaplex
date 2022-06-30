import {
  findPrimaryMetadataCreatorsAddress,
  PrimaryMetadataCreators,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";
import { MetadataJsonCreator } from "sdk/createNft";
import { ArtType, IArt } from "state/artworks";
import { excludesFalsy } from "utils/excludeFalsy";
import { toPubkey } from "utils/toPubkey";

import { loadAccountsAndDeserialize } from "../share";

export const loadPrimaryCreatorsForArtworks = async (
  connection: Connection,
  artworks: IArt[]
) => {
  const artToPrimaryCreatorsMap = new Map<string, string>();

  const primaryCreatorsPDAs = await Promise.all(
    artworks.map(async ({ id, type, accountAddress }) => {
      if (type === ArtType.Master) {
        const [address] = await findPrimaryMetadataCreatorsAddress(
          toPubkey(accountAddress)
        );
        artToPrimaryCreatorsMap.set(id, address.toString());
        return address;
      }
      return null;
    })
  );

  const primaryCreatorsMap =
    await loadAccountsAndDeserialize<PrimaryMetadataCreators>(
      connection,
      PrimaryMetadataCreators,
      primaryCreatorsPDAs.filter(excludesFalsy)
    );

  const primaryCreatorsByArtwork = new Map<string, MetadataJsonCreator[]>();

  artworks.forEach(({ id }) => {
    const address = artToPrimaryCreatorsMap.get(id);
    const primaryCreators = address
      ? primaryCreatorsMap.get(address)
      : undefined;

    if (primaryCreators) {
      primaryCreatorsByArtwork.set(
        id,
        primaryCreators.creators.map((c) => ({
          ...c,
          address: c.address.toString(),
        }))
      );
    }
  });

  return primaryCreatorsByArtwork;
};

export const loadPrimaryCreators = async (
  connection: Connection,
  artwork: IArt
) => {
  const primaryCreatorsMap = await loadPrimaryCreatorsForArtworks(connection, [
    artwork,
  ]);
  return primaryCreatorsMap.get(artwork.id) || [];
};
