import { AnyPublicKey, TokenAccount } from "@metaplex-foundation/mpl-core";
import {
  MarketAccountDataArgs,
  SellingResourceAccountDataArgs,
} from "@metaplex-foundation/mpl-membership-token";
import { MarketState } from "@metaplex-foundation/mpl-membership-token/dist/src/types";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { MetadataJson } from "@metaplex/js";
import { Connection, PublicKey } from "@solana/web3.js";

import { ArtType, IArt } from "state/artworks/types";
import { excludesFalsy } from "utils/excludeFalsy";
import { loadArtworkEdition } from "./loadArtworkEdition";
import { loadExtraContent } from "./loadExtraContent";
import { loadSellingResourcesTokenAccounts } from "./loadSellingResources";

export const loadArtworksBySellingResource = async ({
  connection,
  sellingResources,
  markets,
}: {
  connection: Connection;
  sellingResources: Map<string, SellingResourceAccountDataArgs>;
  markets: Map<string, MarketAccountDataArgs>;
}) => {
  const accounts = await loadSellingResourcesTokenAccounts({
    connection,
    sellingResources,
  });

  const artworks = await loadArtworksByAccounts({ connection, accounts });

  const storeArtworksWithState = artworks.map((artwork) => {
    const [sellingResource] =
      Array.from(sellingResources).find(
        ([, data]) => data.vault.toBase58() === artwork.token
      ) || [];

    if (!sellingResource) return artwork;

    const [, market] =
      Array.from(markets).find(
        ([, data]) => data.sellingResource.toBase58() === sellingResource
      ) || [];

    if (!market) return artwork;
    const state = Number(MarketState[market.state]);

    return { ...artwork, state };
  });

  return storeArtworksWithState;
};

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

  return loadArtworksByAccounts({ connection, accounts });
};

export const loadArtworksByAccounts = async ({
  connection,
  accounts,
}: {
  connection: Connection;
  accounts: TokenAccount[];
}) => {
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
  const account = accountByMint.get(mint);
  const token = account?.pubkey.toBase58();

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
