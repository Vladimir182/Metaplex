import { TokenAccount } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import { excludesFalsy } from "utils/excludeFalsy";

import { loadArtworks } from "./loadArtworks";

export const loadArtworksByAccounts = async ({
  connection,
  accounts,
}: {
  connection: Connection;
  accounts: TokenAccount[];
}) => {
  const accountsWithAmount = accounts.filter(
    ({ data: { amount } }) => amount?.toNumber() > 0
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

  return results
    .filter(excludesFalsy)
    .filter((item) => item.prints?.maxSupply !== 1);
};
