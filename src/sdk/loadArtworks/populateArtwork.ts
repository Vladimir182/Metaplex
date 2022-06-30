import { loadExtraContent, MetadataJson } from "sdk/createNft";
import { IArt } from "state/artworks";

import { IArtLight } from "./combineArtwork";

export const populateArtwork = async (
  art: IArtLight | IArt,
  artworkContent?: MetadataJson
): Promise<IArt> => {
  let content: MetadataJson | null = artworkContent ?? null;
  if (!content) {
    try {
      content = await loadExtraContent<MetadataJson>(
        (art as IArtLight).uri,
        true
      );
    } catch {
      /* nope */
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uri, ...restArt } = art as IArtLight;

  return {
    description: content?.description,
    assets: content?.properties.files,
    ...restArt,
    image: content?.image || art.image,
    title: content?.name || art.title,
    format: content?.properties.category || art.format,
  };
};
