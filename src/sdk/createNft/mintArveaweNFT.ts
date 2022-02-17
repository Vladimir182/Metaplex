import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import {
  actions,
  Connection,
  MetadataJson,
  Wallet,
  ArweaveStorage,
  ArweaveUploadResult,
} from "@metaplex/js";
import { createFilePack, METADATA_FILE_NAME } from "utils/arweave-cost";
import { Pipeline } from "utils/pipeline";
import { payForFiles } from "./payForFiles";

import {
  Metadata,
  MasterEdition,
  Creator,
  CreateMasterEditionV3,
  CreateMetadataV2,
  DataV2,
  UpdateMetadataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { wrappedSendTransaction } from "utils/wrappedSendTransaction";
const { prepareTokenAccountAndMintTxs } = actions;

const EMPTY_URI = " ".repeat(64);

export enum ENftProgress {
  minting,
  preparing_assets,
  signing_metadata_transaction,
  sending_transaction_to_solana,
  waiting_for_initial_confirmation,
  waiting_for_final_confirmation,
  uploading_to_arweave,
  updating_metadata,
  signing_token_transaction,
}

export interface MintArveaweNFTResponse {
  txId: string;
  mint: PublicKey;
  metadata: PublicKey;
  arweaveResult: ArweaveUploadResult;
}

export interface IMintArweaveParams {
  connection: Connection;
  wallet: Wallet;
  storage: ArweaveStorage;
  file: File;
  metadata: MetadataJson;
  maxSupply: number;
  updateProgress?: (status: ENftProgress | null) => void;
}

export async function mintArweaveNFT(
  {
    connection,
    wallet,
    file,
    metadata,
    maxSupply,
    storage,
    updateProgress = () => {},
  }: IMintArweaveParams,
  WebFile: typeof File = File
): Promise<MintArveaweNFTResponse> {
  const pipe = new Pipeline<ENftProgress | null>(null, updateProgress);

  try {
    pipe.setStep(ENftProgress.minting);

    const {
      mint,
      payForFilesTx,
      files,
      createMintTx,
      createAssociatedTokenAccountTx,
      mintToTx,
      metadataPDA,
    } = await pipe.exec(async () => {
      const fileMetadata = createFilePack(
        metadata,
        METADATA_FILE_NAME,
        WebFile
      );
      const files = [file, fileMetadata];

      const payForFilesTx = await payForFiles({
        wallet,
        files,
      });

      const { mint, createMintTx, createAssociatedTokenAccountTx, mintToTx } =
        await prepareTokenAccountAndMintTxs(connection, wallet.publicKey);

      const metadataPDA = await Metadata.getPDA(mint.publicKey);

      return {
        metadataPDA,
        mint,
        payForFilesTx,
        files,
        createMintTx,
        createAssociatedTokenAccountTx,
        mintToTx,
      };
    }, ENftProgress.preparing_assets);

    const createMetadataTx = pipe.exec(() => {
      const creators = metadata.properties.creators.map((c) => new Creator(c));
      const metadataData = new DataV2({
        name: metadata.name,
        symbol: metadata.symbol,
        uri: EMPTY_URI,
        sellerFeeBasisPoints: metadata.seller_fee_basis_points,
        creators,
        collection: null,
        uses: null,
      });
      const createMetadataTx = new CreateMetadataV2(
        {
          feePayer: wallet.publicKey,
        },
        {
          metadata: metadataPDA,
          mint: mint.publicKey,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
          metadataData,
        }
      );
      return createMetadataTx;
    }, ENftProgress.preparing_assets);

    const txid = await pipe.exec(
      () =>
        wrappedSendTransaction({
          connection,
          wallet,
          signers: [mint],
          txs: [
            payForFilesTx,
            createMintTx,
            createMetadataTx,
            createAssociatedTokenAccountTx,
            mintToTx,
          ],
        }),
      ENftProgress.signing_metadata_transaction
    );

    if (!txid) {
      pipe.setStep(null);
      return Promise.reject();
    }

    await pipe.exec(
      () => connection.confirmTransaction(txid, "max"),
      ENftProgress.sending_transaction_to_solana
    );

    await pipe.exec(
      () =>
        // Force wait for max confirmations
        // await connection.confirmTransaction(txid, 'max');
        connection.getParsedConfirmedTransaction(txid, "confirmed"),
      ENftProgress.waiting_for_initial_confirmation
    );

    const { arweaveResult, metadataFile } = await pipe.exec(async () => {
      const arweaveResult = await storage.upload(
        files as unknown as Map<string, Buffer>, // TODO: probably we need to update ArweaveStorage interface
        mint.publicKey.toBase58(),
        txid
      );
      const metadataFile = arweaveResult.messages?.find(
        (m) => m.filename === METADATA_FILE_NAME
      );
      return { arweaveResult, metadataFile };
    }, ENftProgress.waiting_for_final_confirmation);

    const transactionId = metadataFile?.transactionId;
    if (transactionId) {
      const metadataData = pipe.exec(
        () =>
          new DataV2({
            name: metadata.name,
            symbol: metadata.symbol,
            uri: `https://arweave.net/${transactionId}`,
            creators: metadata.properties.creators.map((c) => new Creator(c)),
            sellerFeeBasisPoints: metadata.seller_fee_basis_points,
            collection: null,
            uses: null,
          }),
        ENftProgress.uploading_to_arweave
      );

      const updateTx = pipe.exec(
        () =>
          new UpdateMetadataV2(
            { feePayer: wallet.publicKey },
            {
              metadata: metadataPDA,
              updateAuthority: wallet.publicKey,
              metadataData: metadataData,
              newUpdateAuthority: undefined,
              primarySaleHappened: undefined,
            }
          ),
        ENftProgress.updating_metadata
      );

      const createMetadataTx = await pipe.exec(async () => {
        const editionPda = await MasterEdition.getPDA(mint.publicKey);
        return new CreateMasterEditionV3(
          { feePayer: wallet.publicKey },
          {
            edition: editionPda,
            metadata: metadataPDA,
            updateAuthority: wallet.publicKey,
            mint: mint.publicKey,
            mintAuthority: wallet.publicKey,
            maxSupply: maxSupply ? new BN(maxSupply) : undefined,
          }
        );
      }, ENftProgress.signing_token_transaction);

      const transactionResult = await pipe.exec(
        () =>
          wrappedSendTransaction({
            connection,
            signers: [],
            txs: [updateTx, createMetadataTx],
            wallet,
          }),
        ENftProgress.signing_token_transaction
      );

      if (!transactionResult) {
        pipe.setStep(null);
        return Promise.reject();
      }
    }
    return {
      arweaveResult,
      txId: txid,
      mint: mint.publicKey,
      metadata: metadataPDA,
    };
  } catch (err) {
    pipe.setStep(null);
    throw err;
  }
}
