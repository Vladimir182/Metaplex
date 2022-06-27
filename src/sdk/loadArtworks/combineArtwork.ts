import { TokenAccount } from "@metaplex-foundation/mpl-core";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { IArt } from "state/artworks/types";
import { parseBN } from "utils/parseBN";

import { ArtEditionProps } from "./loadArtworkEdition";

export const DEFAULT_ART_IMAGE =
  "https://explorer.solana.com/static/media/dark-solana-logo.fa522d66.svg";

interface Params {
  pubkey: PublicKey;
  metadata: MetadataData;
  editionProps: ArtEditionProps;
  token: TokenAccount;
}

export type IArtLight = Omit<
  IArt,
  "description" | "assets" | "properties" | "animationUrl"
> & { uri: string };

export const combineArtwork = ({
  pubkey,
  metadata,
  editionProps,
  token,
}: Params): IArtLight => ({
  id: metadata.mint.toString(),
  mint: metadata.mint.toString(),
  accountAddress: pubkey.toString(),
  token: token.pubkey.toString(),
  tokenAmount: parseBN(token.data.amount),
  ownerAddress: token.data.owner.toString(),
  primarySaleHappened: metadata.primarySaleHappened,
  sellerFeeBasisPoints: metadata.data.sellerFeeBasisPoints,
  creators: (metadata.data.creators ?? []).map((c) => ({
    ...c,
    address: c.address.toString(),
  })),
  ...editionProps,
  uri: metadata.data.uri,
  title: metadata.data.name,
  image: DEFAULT_ART_IMAGE,
  format: "image",
});
