import { Cluster, Connection } from "@solana/web3.js";
import { allSettled, fork } from "effector";
import {
  $connection,
  $network,
  networkChange,
  getSavedNetwork,
  NETWORK_KEY,
  setNetworkToStorageFx,
} from "./connection";

class TestStorage implements Storage {
  private data = new Map<string, string>();

  get length() {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
  }
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  key(): string | null {
    throw new Error("Method not implemented.");
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

describe("connection", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new TestStorage();
  });

  it("should update network on networkChange event", async () => {
    const scope = fork();
    await allSettled(networkChange, { scope, params: "devnet" });
    expect(scope.getState($network)).toBe("devnet");

    await allSettled(networkChange, { scope, params: "mainnet-beta" });
    expect(scope.getState($network)).toBe("mainnet-beta");
  });

  it("should change connection on change network", async () => {
    const scope = fork();
    expect(scope.getState($connection)).toBeInstanceOf(Connection);

    await allSettled(networkChange, { scope, params: "devnet" });
    const conn1 = scope.getState($connection);

    await allSettled(networkChange, { scope, params: "devnet" });
    expect(scope.getState($connection)).toEqual(conn1);

    await allSettled(networkChange, { scope, params: "mainnet-beta" });
    expect(scope.getState($connection)).not.toEqual(conn1);
  });

  describe("getSavedNetwork", () => {
    it("without anything", () => {
      expect(getSavedNetwork()).toBe("devnet");
    });

    it("default", () => {
      expect(getSavedNetwork("testnet", storage)).toBe("testnet");
    });
    it("from cache", () => {
      storage.setItem(NETWORK_KEY, "devnet");
      expect(getSavedNetwork("testnet", storage)).toBe("devnet");
    });

    it("incorect cache", () => {
      storage.setItem(NETWORK_KEY, "1234");
      expect(getSavedNetwork("testnet", storage)).toBe("testnet");
    });
  });

  it("$network", () => {
    const scope = fork();
    expect(scope.getState($network)).toBe("devnet");
  });

  it("setNetworkToStorage", async () => {
    const mockFx = jest.fn<
      void,
      [
        _: {
          storage?: Storage | null;
          network: Cluster;
        }
      ]
    >(() => {});
    const scope = fork({
      handlers: [[setNetworkToStorageFx, mockFx]],
    });
    expect(mockFx.mock.calls.length).toBe(0);
    await allSettled(networkChange, { scope, params: "testnet" });
    expect(mockFx.mock.calls.length).toBe(1);
    expect(mockFx.mock.calls[0][0]).toEqual({
      network: "testnet",
    });
  });
});
