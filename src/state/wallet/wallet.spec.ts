import type { WalletContextState } from "@solana/wallet-adapter-react";
import { allSettled, fork } from "effector";

import { $user, $wallet, $walletAddress, walletChange } from "./wallet";

describe("wallet", () => {
  const wallet = {
    connected: true,
    publicKey: {
      toString() {
        return "test-address";
      },
    },
  } as WalletContextState;

  it("default", async () => {
    const scope = fork();
    expect(scope.getState($wallet)).toBe(null);
    await allSettled(walletChange, { scope, params: wallet });
    expect(scope.getState($wallet)).toBe(wallet);
  });

  it("$walletAddress", async () => {
    const scope = fork();
    expect(scope.getState($walletAddress)).toBe(null);
    await allSettled(walletChange, { scope, params: wallet });
    expect(scope.getState($walletAddress)).toBe("test-address");
  });

  it("$user", async () => {
    const scope = fork();
    expect(scope.getState($user)).toBe(null);
    await allSettled(walletChange, { scope, params: wallet });
    expect(scope.getState($user)).toEqual({
      address: "test-address",
    });
  });
});
