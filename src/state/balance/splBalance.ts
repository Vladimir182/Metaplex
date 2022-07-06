import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { attach, createEffect, StoreValue } from "effector";
import { $connection } from "state/connection";
import { toPubkey } from "utils/toPubkey";

import { $wallet } from "../wallet";

interface Params {
  token: AnyPublicKey;
}

export const getWalletSplBalanceFx = attach({
  effect: createEffect(
    async ({
      wallet,
      connection,
      token,
    }: Params & {
      wallet: StoreValue<typeof $wallet>;
      connection: StoreValue<typeof $connection>;
    }) => {
      if (!wallet) {
        throw new Error("empty wallet");
      }

      const mint = toPubkey(token);
      const tokenAddress = await getAssociatedTokenAddress(
        mint,
        wallet.publicKey
      );

      try {
        // TODO: connection.getTokenSupply() ?
        const balance = await connection.getTokenAccountBalance(tokenAddress);
        return parseFloat(balance.value.amount);
      } catch {
        return 0;
      }
    }
  ),
  source: {
    wallet: $wallet,
    connection: $connection,
  },
  mapParams(data: Params, source) {
    return { ...data, ...source };
  },
});
