import { MetadataJson } from "@metaplex/js";
import { TokenAccount } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";
import { ArtType, IArt } from "state/artworks/types";

import { loadArtworkEdition } from "../loadArtworkEdition";
import { loadExtraContent } from "../loadExtraContent";

export const loadArtworks = async ({
  connection,
  account: {
    data: {
      mint,
      data: { uri },
      primarySaleHappened = false,
    },
    pubkey,
  },
  accountByMint,
}: {
  connection: Connection;
  account: Metadata;
  accountByMint: Map<string, TokenAccount>;
}): Promise<undefined | IArt> => {
  const editionProps = await loadArtworkEdition({ connection, mint });
  // We ignore non-master editions
  if (!editionProps || editionProps.type !== ArtType.Master) {
    return;
  }

  const artworkContent = await loadExtraContent<MetadataJson>(uri);
  const account = accountByMint.get(mint);
  const token = account?.pubkey.toBase58();

  return {
    id: pubkey.toString(),
    token,
    mint,
    primarySaleHappened,
    image: artworkContent.image,
    title: artworkContent.name,
    description: artworkContent.description,
    creators: artworkContent.properties.creators,
    format: artworkContent.properties.category,
    assets: artworkContent.properties.files,
    owner: account?.data.owner.toBase58(),
    ...editionProps,
  };
};
