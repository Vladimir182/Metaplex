import type { WalletContextState } from "@solana/wallet-adapter-react";
import { File } from "@web-std/file";
import { FormData } from "components/forms/NftCreate";
import { allSettled, fork } from "effector";
import { ENftProgress } from "sdk/createNft/mintArveaweNFT";
import { walletChange } from "state/wallet";
import {
  createMetadataTools,
  createPriceTools,
  getContent,
} from "./NftCreationView.state";
jest.mock("@metaplex/arweave-cost", () => ({
  calculate: () => {
    return Promise.resolve({
      arweave: 0.000050121524,
      arweavePrice: 57.1,
      byteCost: 40121524,
      exchangeRate: 0.24348641848961666,
      fee: 10000000,
      solana: 0.000012203910368001364,
      solanaPrice: 234.51,
      totalBytes: 214,
    });
  },
}));
describe("NftCreationView.state", () => {
  afterAll(() => {
    jest.unmock("@metaplex/arweave-cost");
  });

  const SUPPLY = 6;

  const FORM_DATA: Partial<FormData> = {
    preview: new File(["preview"], "preview.json"),
    file: new File(["test"], "test.json"),
    title: "test",
    desc: "test",
    supply: `${SUPPLY}`,
    royalty: "4",
    attributes: [],
  };

  describe("createMetadataTools", () => {
    let entry: ReturnType<typeof createMetadataTools>;

    beforeEach(() => {
      entry = createMetadataTools(File);
    });

    it("updateMetadata $fileObject", async () => {
      const scope = fork();
      await allSettled(entry.updateMetadata, { scope, params: FORM_DATA });
      expect(scope.getState(entry.$fileObject)).toBe(FORM_DATA.file);
    });

    it("updateMetadata $maxSupply", async () => {
      const scope = fork();
      await allSettled(entry.updateMetadata, { scope, params: FORM_DATA });
      expect(scope.getState(entry.$maxSupply)).toBe(SUPPLY);
    });

    it("updateMetadata $metadataObject", async () => {
      const scope = fork();
      await allSettled(entry.updateMetadata, { scope, params: FORM_DATA });
      expect(scope.getState(entry.$metadataObject)).toEqual({
        attributes: [],
        description: "test",
        external_url: "",
        image: "test.json",
        name: "test",
        properties: {
          files: [{ type: "", uri: "test.json" }],
          category: "image",
          creators: [],
        },
        seller_fee_basis_points: 400,
        symbol: "",
      });
    });

    it("updateMetadata $metadataObject with creators", async () => {
      const wallet = {
        connected: true,
        publicKey: {
          toString() {
            return "test";
          },
        },
      } as WalletContextState;
      const scope = fork();
      await allSettled(walletChange, { scope, params: wallet });
      await allSettled(entry.updateMetadata, { scope, params: FORM_DATA });
      expect(scope.getState(entry.$metadataObject)).toEqual({
        attributes: [],
        description: "test",
        external_url: "",
        image: "test.json",
        name: "test",
        properties: {
          files: [{ type: "", uri: "test.json" }],
          category: "image",
          creators: [{ address: "test", share: 100, verified: true }],
        },
        seller_fee_basis_points: 400,
        symbol: "",
      });
    });
  });

  describe("getContent", () => {
    it("null", () => {
      expect(getContent(null)).toEqual({
        title: "",
        subtitle: "",
      });
    });

    it("ENftProgress.minting", () => {
      expect(getContent(ENftProgress.minting)).toEqual({
        title: "Creating",
        subtitle: "Starting Token Creation Process",
      });
    });

    it("ENftProgress.preparing_assets", () => {
      expect(getContent(ENftProgress.preparing_assets)).toEqual({
        title: "Preparing Assets",
        subtitle: "",
      });
    });

    it("ENftProgress.signing_metadata_transaction", () => {
      expect(getContent(ENftProgress.signing_metadata_transaction)).toEqual({
        title: "Signing Metadata Transaction",
        subtitle: "Approve the transaction from your wallet",
      });
    });

    it("ENftProgress.sending_transaction_to_solana", () => {
      expect(getContent(ENftProgress.sending_transaction_to_solana)).toEqual({
        title: "Sending Transaction to Solana",
        subtitle: "This will take a few seconds",
      });
    });

    it("ENftProgress.waiting_for_initial_confirmation", () => {
      expect(getContent(ENftProgress.waiting_for_initial_confirmation)).toEqual(
        {
          title: "Waiting for Initial Confirmation",
          subtitle: "",
        }
      );
    });

    it("ENftProgress.waiting_for_final_confirmation", () => {
      expect(getContent(ENftProgress.waiting_for_final_confirmation)).toEqual({
        title: "Waiting for Final Confirmation",
        subtitle: "",
      });
    });

    it("ENftProgress.uploading_to_arweave", () => {
      expect(getContent(ENftProgress.uploading_to_arweave)).toEqual({
        title: "Uploading to Arweave",
        subtitle: "",
      });
    });

    it("ENftProgress.updating_metadata", () => {
      expect(getContent(ENftProgress.updating_metadata)).toEqual({
        title: "Updating Metadata",
        subtitle: "",
      });
    });

    it("ENftProgress.signing_token_transaction", () => {
      expect(getContent(ENftProgress.signing_token_transaction)).toEqual({
        title: "Signing Token Transaction",
        subtitle: "Approve the final transaction from your wallet",
      });
    });
  });

  it("createPriceTools", async () => {
    const metadataEntry = createMetadataTools(File);
    const entry = createPriceTools(metadataEntry, File);
    const scope = fork({
      handlers: [[entry.metadataCostFx, () => Promise.resolve(0.00707832)]],
    });
    expect(scope.getState(entry.$price)).toEqual(0);

    await allSettled(metadataEntry.updateMetadata, {
      scope,
      params: FORM_DATA,
    });
    await allSettled(entry.updateCostFx, { scope });
    expect(scope.getState(entry.$price)).toEqual(0.007090523910368001);
  });
});
