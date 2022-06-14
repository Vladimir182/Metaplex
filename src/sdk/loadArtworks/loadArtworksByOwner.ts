import { AnyPublicKey, TokenAccount } from "@metaplex-foundation/mpl-core";
import { Connection } from "@solana/web3.js";
import { loadArtworksByAccounts } from "./loadArtworksByAccounts";

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
