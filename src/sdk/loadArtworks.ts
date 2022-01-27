import { AnyPublicKey, TokenAccount } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { MetadataJson } from "@metaplex/js";
import { Connection, PublicKey } from "@solana/web3.js";

import { ArtType, IArt } from "state/artworks/types";
import { excludesFalsy } from "utils/excludeFalsy";
import { loadArtworkEdition } from "./loadArtworkEdition";
import { loadExtraContent } from "./loadExtraContent";

export const loadArtworksByOwner = async ({
  connection,
  owner,
}: {
  connection: Connection;
  owner: AnyPublicKey;
}) => {
  const accounts = await TokenAccount.getTokenAccountsByOwner(
    connection,
    owner
  );
  const accountsWithAmount = accounts
    .map(({ data }) => data)
    .filter(({ amount }) => amount?.toNumber() > 0);
  const accountByMint = accounts.reduce<Map<string, TokenAccount>>(
    (prev: Map<string, TokenAccount>, acc: TokenAccount) => {
      prev.set(acc.data.mint.toBase58(), acc);
      return prev;
    },
    new Map<string, TokenAccount>()
  );

  const PDAs = await Promise.all(
    accountsWithAmount.map(({ mint }) => Metadata.getPDA(mint))
  );

  const metadataAccounts = await Metadata.getInfos(connection, PDAs);
  const metadata: Metadata[] = [];
  metadataAccounts.forEach((account, key) => {
    try {
      metadata.push(
        new Metadata(key, { ...account, owner: new PublicKey(account.owner) })
      );
    } catch {
      return;
    }
  });

  const results = await Promise.all(
    metadata.map((account) =>
      loadArtworkData({ connection, account, accountByMint }).catch(() => null)
    )
  );

  return results.filter(excludesFalsy);
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
  const token = accountByMint.get(mint)?.pubkey.toBase58();

  return {
    id: pubkey.toString(),
    token,
    mint,
    image: artworkContent.image,
    title: artworkContent.name,
    description: artworkContent.description,
    creators: artworkContent.properties.creators,
    format: artworkContent.properties.category,
    assets: artworkContent.properties.files,
    ...editionProps,
  };
};
