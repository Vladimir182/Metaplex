import { TokenAccount } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";
import { ArtType } from "state/artworks/types";

import { combineArtwork, IArtLight } from "./combineArtwork";
import { loadArtworkEdition } from "./loadArtworkEdition";

export const loadArtworks = async ({
  connection,
  account,
  accountByMint,
}: {
  connection: Connection;
  account: Metadata;
  accountByMint: Map<string, TokenAccount>;
}): Promise<undefined | IArtLight> => {
  const mint = account.data.mint;

  const editionProps = await loadArtworkEdition({ connection, mint });
  // We ignore non-master editions
  if (editionProps?.type !== ArtType.Master) {
    return;
  }

  const token = accountByMint.get(mint);

  if (!token) {
    return;
  }

  return combineArtwork({
    editionProps,
    token,
    pubkey: account.pubkey,
    metadata: account.data,
  });
};
