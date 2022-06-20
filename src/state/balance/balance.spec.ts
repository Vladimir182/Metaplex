import type { WalletContextState } from "@solana/wallet-adapter-react";
import { allSettled, fork } from "effector";
import { lamportsToSol } from "utils/lamportsToSol";

import { $wallet, walletChange } from "../wallet/wallet";
import { updateWalletBalanceFx } from "./balance";

describe("balance", () => {
  it("extractBalance", () => {
    const balance = lamportsToSol(777777);
    expect(balance).toBe(0.000777777);
  });

  it("balance changing", async () => {
    const mockFx = jest.fn(() => 42);
    const scope = fork({
      handlers: [[updateWalletBalanceFx, mockFx]],
    });

    expect(scope.getState($wallet)).toBe(null);
    const wallet = {
      connected: true,
      publicKey: {
        toString() {
          return "test";
        },
      },
    } as WalletContextState;
    await allSettled(walletChange, { scope, params: wallet });
    expect(mockFx.mock.calls.length).toBe(1);
  });
});
