/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArweaveStorage, Connection, MetadataJson } from "@metaplex/js";
import { File } from "@web-std/file";
import { allSettled, fork } from "effector";
import { MintArveaweNFTResponse } from "sdk/createNft/mintArveaweNFT";
import { $network } from "./connection";
import {
  mintArweaveFx,
  $storage,
  ARWEAVE_UPLOAD_ENDPOINT,
  IMintArweaveParams,
  IMintArweaveParamsWithSource,
  IMintArweaveSource,
} from "./nft";

describe("nft", () => {
  it("$storage", () => {
    const scope = fork();
    const storage = scope.getState($storage);
    const env = scope.getState($network);
    expect(storage).toBeInstanceOf(ArweaveStorage);
    expect(storage.endpoint).toBe(ARWEAVE_UPLOAD_ENDPOINT);
    expect(storage.env).toBe(env);
  });

  it("mintArweaveFx", async () => {
    const mockFn = jest.fn(
      (_1: IMintArweaveSource, _: IMintArweaveParamsWithSource) =>
        Promise.resolve("Mock OK" as unknown as MintArveaweNFTResponse)
    );
    const scope = fork({
      handlers: [[mintArweaveFx, mockFn]],
    });

    const params: IMintArweaveParams = {
      file: new File([], "test.js"),
      metadata: {} as MetadataJson,
      maxSupply: 5,
      WebFile: File,
    };

    const result = await allSettled(mintArweaveFx, { scope: scope, params });
    expect(result.status).toBe("done");
    expect(result.value).toBe("Mock OK");
    expect(mockFn.mock.calls.length).toBe(1);
    const { connection, storage, wallet, ...props } = mockFn.mock.calls[0][1];
    expect(props).toMatchObject(params);
    expect(connection).toBeInstanceOf(Connection);
    expect(storage).toBeInstanceOf(ArweaveStorage);
    expect(wallet).toBe(null);
  });
});
