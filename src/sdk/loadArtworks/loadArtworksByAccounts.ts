import { TokenAccount } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import { IArt } from "state/artworks";
import { excludesFalsy } from "utils/excludeFalsy";
import { parseBN } from "utils/parseBN";

import { loadArtworks } from "./loadArtworks";
import { populateArtwork } from "./populateArtwork";

export const loadArtworksByAccounts = async ({
  connection,
  accounts,
}: {
  connection: Connection;
  accounts: TokenAccount[];
}): Promise<IArt[]> => {
  const accountsWithAmount = accounts.filter(
    ({ data: { amount } }) => parseBN(amount) === 1
  );

  const accountByMint = accounts.reduce<Map<string, TokenAccount>>(
    (prev: Map<string, TokenAccount>, acc: TokenAccount) => {
      prev.set(acc.data.mint.toBase58(), acc);
      return prev;
    },
    new Map<string, TokenAccount>()
  );

  const PDAs = await Promise.all(
    accountsWithAmount.map(({ data: { mint } }) => Metadata.getPDA(mint))
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
