import { Account } from "@metaplex-foundation/mpl-core";
import { attach, createEffect, forward, StoreValue } from "effector";
import { $wallet, walletChange } from "./wallet";
import { $connection } from "../connection";
import { preload } from "state/utils";
import { lamportsToSol } from "../../utils/lamportsToSol";

export const updateWalletBalanceFx = attach({
  effect: createEffect(
    async ({
      wallet,
      connection,
    }: {
      wallet: StoreValue<typeof $wallet>;
      connection: StoreValue<typeof $connection>;
    }) => {
      if (!wallet) {
        throw new Error("empty wallet");
      }

      const account = await Account.load(connection, wallet.publicKey);
      const sol = lamportsToSol(account.info.lamports);
      return sol;
    }
  ),
  source: {
    wallet: $wallet,
    connection: $connection,
  },
});

export const preloadWalletBalance = preload(updateWalletBalanceFx);

forward({
  from: [walletChange, $connection],
  to: updateWalletBalanceFx,
});
