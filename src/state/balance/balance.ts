import { Account } from "@metaplex-foundation/mpl-core";
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
  StoreValue,
} from "effector";
import { interval } from "patronum";
import { $connection } from "state/connection";
import { lamportsToSol } from "utils/lamportsToSol";
import { $wallet, walletChange } from "../wallet";

export const startBalancePolling = createEvent();
export const stopBalancePolling = createEvent();

const { tick } = interval({
  timeout: 5_000,
  start: startBalancePolling,
  stop: stopBalancePolling,
});

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
      return lamportsToSol(account.info?.lamports || 0);
    }
  ),
  source: {
    wallet: $wallet,
    connection: $connection,
  },
});

export const $walletBalance = createStore<number>(0);

forward({
  from: [walletChange, $connection],
  to: updateWalletBalanceFx,
});

forward({ from: updateWalletBalanceFx.doneData, to: $walletBalance });

forward({ from: tick, to: updateWalletBalanceFx });
