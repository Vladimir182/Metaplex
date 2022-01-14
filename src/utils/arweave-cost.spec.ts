import {
  createFilePack,
  getFileAndMetadataCostInfo,
  METADATA_FILE_NAME,
} from "./arweave-cost";
import { File } from "@web-std/file";
import { MetadataJson } from "@metaplex/js";
jest.mock("@metaplex/arweave-cost", () => ({
  calculate: () =>
    Promise.resolve({
      arweave: 0.000050121524,
      arweavePrice: 57.1,
      byteCost: 40121524,
      exchangeRate: 0.24348641848961666,
      fee: 10000000,
      solana: 0.000012203910368001364,
      solanaPrice: 234.51,
      totalBytes: 214,
    }),
}));
describe("arweave-cost", () => {
  afterAll(() => {
    jest.unmock("@metaplex/arweave-cost");
  });

  it("getFileAndMetadataCostInfo", async () => {
    const file = new File(["hello world"], "test.txt");
    const metadata: MetadataJson = {
      attributes: [],
      description: "test",
      external_url: "",
      image: "test.json",
      name: "test",
      properties: {
        files: [{ type: "", uri: "test.txt" }],
        category: "image",
        creators: [],
      },
      seller_fee_basis_points: 400,
      symbol: "",
    };
    const result = await getFileAndMetadataCostInfo(
      file,
      metadata,
      createFilePack(metadata, METADATA_FILE_NAME, File)
    );
    expect(result).toEqual({
      info: {
        arweave: 0.000050121524,
        arweavePrice: 57.1,
        byteCost: 40121524,
        exchangeRate: 0.24348641848961666,
        fee: 10000000,
        solana: 0.000012203910368001364,
        solanaPrice: 234.51,
        totalBytes: 214,
      },
      lamports: 12203.910368001365,
    });
  });
});
