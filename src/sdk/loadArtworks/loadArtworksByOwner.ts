import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";
import { TokenAccount } from "sdk/share";
import { parseBN } from "utils/parseBN";
import { toPubkey } from "utils/toPubkey";

import { loadArtworksByAccounts } from "./loadArtworksByAccounts";

export const loadArtworksByOwner = async ({
  connection,
  owner,
}: {
  connection: Connection;
  owner: AnyPublicKey;
}) => {
  const accounts = await connection.getTokenAccountsByOwner(toPubkey(owner), {
    programId: TOKEN_PROGRAM_ID,
  });

  const tokens = accounts.value.reduce<TokenAccount[]>(
    (acc, { pubkey, account }) => {
      const data = AccountLayout.decode(account.data);

      if (parseBN(data.amount) < 1) {
        return acc;
      }

      return [...acc, { address: pubkey, ...data }];
    },
    []
  );

  return loadArtworksByAccounts({ connection, tokens });
};
