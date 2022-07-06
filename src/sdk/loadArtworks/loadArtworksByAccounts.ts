import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  ApplyChunkFn,
  getMultipleAccounts,
  processAccountInfo,
  TokenAccount,
} from "sdk/share";
import { IArt } from "state/artworks";
import { excludesFalsy } from "utils/excludeFalsy";

import { loadArtworks } from "./loadArtworks";
import { populateArtwork } from "./populateArtwork";
import { findMetadataAddress } from "./utils";

const decodeMetadata = processAccountInfo(Metadata, PROGRAM_ID);

export const loadArtworksByAccounts = async ({
  connection,
  tokens,
}: {
  connection: Connection;
  tokens: TokenAccount[];
}): Promise<IArt[]> => {
  const metadataAccounts: [PublicKey, Metadata][] = [];
  const accountByMint = getAccountByMint(tokens);

  const metadataAddresses = (
    await Promise.all(tokens.map(({ mint }) => findMetadataAddress(mint)))
  ).map(([publicKey]) => publicKey);

  const metadataChunkHandler: ApplyChunkFn = (infos, addresses) => {
    infos.forEach((info, index) => {
      const account = decodeMetadata(info, addresses[index]);
      if (!account) return;
      metadataAccounts.push([...account]);
    });
  };

  await getMultipleAccounts(
    connection,
    metadataAddresses,
    metadataChunkHandler
  );

  const results = await Promise.all(
    metadataAccounts.map((account) =>
      loadArtworks({ connection, account, accountByMint }).catch(() => null)
    )
  );

  const lightArtworks = results
    .filter(excludesFalsy)
    .filter(
      ({ prints }) => prints?.maxSupply === undefined || prints.maxSupply > 1
    );

  return Promise.all(lightArtworks.map((art) => populateArtwork(art)));
};

const getAccountByMint = (tokens: TokenAccount[]) =>
  tokens.reduce<Map<string, TokenAccount>>(
    (prev: Map<string, TokenAccount>, token: TokenAccount) => {
      prev.set(token.mint.toBase58(), token);
      return prev;
    },
    new Map<string, TokenAccount>()
  );
