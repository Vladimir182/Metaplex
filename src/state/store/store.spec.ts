import { allSettled, fork } from "effector";
import { toPubkey } from "utils/toPubkey";
import { $hasStore, $store, loadStoreByOwnerFx } from ".";
import { store as storeMock } from "./store.mock";

describe("store", () => {
  const STORE_OWNER = toPubkey("8NHnPQhioK9oQTQUWqhc6HgpcKnRDafu9tmjHWL7W2dy");

  describe("$hasStore", () => {
    it("null", () => {
      const scope = fork({
        values: [[$store, null]],
      });
      expect(scope.getState($hasStore)).toBe(false);
    });

    it("true", async () => {
      const scope = fork({
        handlers: [[loadStoreByOwnerFx, () => Promise.resolve(storeMock)]],
      });
      await allSettled(loadStoreByOwnerFx, {
        scope,
        params: STORE_OWNER,
      });
      expect(scope.getState($hasStore)).toBe(true);
    });

    it("false", async () => {
      const scope = fork({
        handlers: [[loadStoreByOwnerFx, () => Promise.reject(new Error())]],
      });
      await allSettled(loadStoreByOwnerFx, {
        scope,
        params: STORE_OWNER,
      });
      expect(scope.getState($hasStore)).toBe(false);
    });
  });
});
