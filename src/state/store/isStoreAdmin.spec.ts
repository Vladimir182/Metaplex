import { fork } from "effector";
import { $isStoreAdmin } from "./isStoreAdmin";
import { $store } from "./store";
import { $walletContext } from "state/wallet";

describe("isStoreAdmin", () => {
  const WALLET = {
    connected: true,
    publicKey: {
      toString() {
        return "test";
      },
    },
  };

  const getStore = (owner = "test") => ({ owner });

  it("true", () => {
    const scope = fork({
      values: [
        [$store, getStore()],
        [$walletContext, WALLET],
      ],
    });
    expect(scope.getState($isStoreAdmin)).toBeTruthy();
  });

  it("null values", () => {
    const scope = fork({
      values: [
        [$store, null],
        [$walletContext, null],
      ],
    });
    expect(scope.getState($isStoreAdmin)).toBe(null);

    const scope1 = fork({
      values: [
        [$store, null],
        [$walletContext, WALLET],
      ],
    });
    expect(scope1.getState($isStoreAdmin)).toBe(null);

    const scope2 = fork({
      values: [
        [$store, getStore()],
        [$walletContext, null],
      ],
    });
    expect(scope2.getState($isStoreAdmin)).toBe(null);
  });

  it("false", () => {
    const scope = fork({
      values: [
        [$store, getStore("test1")],
        [$walletContext, WALLET],
      ],
    });
    expect(scope.getState($isStoreAdmin)).toBeFalsy();
  });
});
