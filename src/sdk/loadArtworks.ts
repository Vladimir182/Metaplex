import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { MetadataJson } from "@metaplex/js";
import { Connection } from "@solana/web3.js";
import { IArt } from "state/artworks/types";
import { excludesFalsy } from "utils/excludeFalsy";
import { loadArtworkEdition } from "./loadArtworkEdition";
import { loadExtraContent } from "./loadExtraContent";

export const loadArtworksByCreators = async ({
  connection,
  creators,
}: {
  connection: Connection;
  creators: AnyPublicKey[];
}) => {
  const accounts = await Metadata.findMany(connection, {
    creators,
  });

  const results = await Promise.all(
    accounts.map((account) =>
      loadArtworkData({ connection, account }).catch(() => null)
    )
  );
  return results.filter(excludesFalsy);
};

export const loadArtworksByOwner = async ({
  connection,
  owner,
}: {
  connection: Connection;
  owner: AnyPublicKey;
}) => {
  const accounts = await Metadata.findByOwnerV2(connection, owner);

  const results = await Promise.all(
    accounts.map((account) =>
      loadArtworkData({ connection, account }).catch(() => null)
    )
  );
  return results.filter(excludesFalsy);
};

export const loadArtworkByMint = async ({
  connection,
  mint,
}: {
  connection: Connection;
  mint: AnyPublicKey;
}) => {
  const pubkey = await Metadata.getPDA(mint);
  const account = await Metadata.load(connection, pubkey);
  return loadArtworkData({ connection, account });
};

export const loadArtworkData = async ({
  connection,
  account: {
    data: {
      mint,
      data: { uri },
    },
    pubkey,
  },
}: {
  connection: Connection;
  account: Metadata;
}): Promise<IArt> => {
  const artworkContent = await loadExtraContent<MetadataJson>(uri);
  const editionProps = await loadArtworkEdition({ connection, mint });

  return {
    id: pubkey.toString(),
    image: artworkContent.image,
    title: artworkContent.name,
    description: artworkContent.description,
    creators: artworkContent.properties.creators,
    format: artworkContent.properties.category,
    assets: artworkContent.properties.files,
    ...editionProps,
  };
};
