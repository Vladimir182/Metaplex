import { allSettled, fork } from "effector";
import { $hasStore, $store, IStore, loadStoreFx } from ".";
import { store as storeMock } from "./store.mock";
describe("store", () => {
  const STORE_ADDRESS = "8NHnPQhioK9oQTQUWqhc6HgpcKnRDafu9tmjHWL7W2dy";

  const STORE: IStore = {
    name: "name",
    admin: "owner",
    storeId: STORE_ADDRESS,
  };

  it("$storeAddress", async () => {
    const loadStore = jest.fn(() => Promise.resolve(STORE));

    const scope = fork({
      values: [[$store, null]],
      handlers: [[loadStoreFx, loadStore]],
    });

    await allSettled(loadStoreFx, {
      scope,
    });

    expect(scope.getState($store)).toBe(STORE);
  });

  describe("$hasStore", () => {
    it("null", () => {
      const scope = fork({
        values: [[$store, null]],
      });
      expect(scope.getState($hasStore)).toBe(null);
    });
    it("true", async () => {
      const scope = fork({
        handlers: [[loadStoreFx, () => Promise.resolve(storeMock)]],
      });
      await allSettled(loadStoreFx, {
        scope,
      });
      expect(scope.getState($hasStore)).toBe(true);
    });
    it("false", async () => {
      const scope = fork({
        handlers: [[loadStoreFx, () => Promise.reject(new Error("test"))]],
      });
      await allSettled(loadStoreFx, {
        scope,
      });
      expect(scope.getState($hasStore)).toBe(false);
    });
  });
});
