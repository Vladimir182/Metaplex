import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import { TokenAccount } from "sdk/share";
import { ArtType } from "state/artworks/types";

import { combineArtwork, IArtLight } from "./combineArtwork";
import { loadArtworkEdition } from "./loadArtworkEdition";

export const loadArtworks = async ({
  connection,
  account,
  accountByMint,
}: {
  connection: Connection;
  account: [PublicKey, Metadata];
  accountByMint: Map<string, TokenAccount>;
}): Promise<undefined | IArtLight> => {
  const [publicKey, metadata] = account;
  const { mint } = metadata;

  const editionProps = await loadArtworkEdition({ connection, mint });
  // We ignore non-master editions
  if (editionProps?.type !== ArtType.Master) {
    return;
  }

  const token = accountByMint.get(mint.toBase58());

  if (!token) {
    return;
  }

  return combineArtwork({
    editionProps,
    token,
    metadata,
    pubkey: publicKey,
  });
};
