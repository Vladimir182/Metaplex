import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV2Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { Cluster, Connection } from "@solana/web3.js";
import { createPrimaryMetadataCreatorsTransaction } from "sdk/creators/transactions/createPrimaryMetadataCreatorsTransaction";
import {
  findEditionAddress,
  findMetadataAddress,
} from "sdk/loadArtworks/utils";
import { sendTransactions, TransactionsBatch } from "sdk/transactions";
import { IArtCreator } from "state/artworks";
import { toPubkey } from "utils/toPubkey";
import { AddressRow } from "views/NftCreationView";
import { Wallet } from "wallet";

import { prepareTokenAccountAndMintTxs } from "./actions/prepareTokenAccountAndMintTxs";
import { MetadataJson } from "./types";
import { uploadFiles2Arweave } from "./uploadFiles2Arweave";

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
  loading_account,
}

export interface IMintArweaveParams {
  connection: Connection;
  wallet: Wallet;
  network: Cluster;
  file: File;
  metadata: MetadataJson;
  maxSupply: number | null;
  primaryRoyalties: AddressRow[];
  updateProgress?: (status: ENftProgress | null) => void;
}

export async function mintArweaveNFT({
  connection,
  wallet,
  file,
  metadata,
  maxSupply,
  network,
  updateProgress,
  primaryRoyalties,
}: IMintArweaveParams) {
  updateProgress?.(ENftProgress.preparing_assets);
  const meta = JSON.stringify(metadata);

  const { mint, tx: mintToTx } = await prepareTokenAccountAndMintTxs(
    connection,
    wallet.publicKey
  );

  const { fileUri } = await uploadFiles2Arweave({
    connection,
    wallet,
    meta,
    file,
    mintKey: mint.publicKey.toString(),
    network,
  });

  const [metadataPDA] = await findMetadataAddress(mint.publicKey);

  const walletAddress = wallet.publicKey.toString();
  const creators = metadata.properties.creators.map((c) => ({
    ...c,
    verified: c.address === walletAddress,
    address: toPubkey(c.address),
  }));
  const data: DataV2 = {
    name: metadata.name,
    symbol: metadata.symbol,
    uri: fileUri,
    sellerFeeBasisPoints: metadata.seller_fee_basis_points,
    creators,
    collection: null,
    uses: null,
  };

  const createMetadataIx = createCreateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      mint: mint.publicKey,
      mintAuthority: wallet.publicKey,
      updateAuthority: wallet.publicKey,
      payer: wallet.publicKey,
    },
    {
      createMetadataAccountArgsV2: { data, isMutable: true },
    }
  );

  const [editionPda] = await findEditionAddress(mint.publicKey);

  const createMasterEditionIx = createCreateMasterEditionV3Instruction(
    {
      edition: editionPda,
      mint: mint.publicKey,
      updateAuthority: wallet.publicKey,
      mintAuthority: wallet.publicKey,
      payer: wallet.publicKey,
      metadata: metadataPDA,
    },
    {
      createMasterEditionArgs: {
        maxSupply: maxSupply,
      },
    }
  );

  const creatorsPrimary: IArtCreator[] = primaryRoyalties.map((royalty) => ({
    ...royalty,
    verified: Boolean(royalty.isOwner),
    share: Number(royalty.share),
  }));

  const createPrimaryMetadataCreatorsTx =
    await createPrimaryMetadataCreatorsTransaction({
      connection,
      wallet,
      metadata: metadataPDA,
      creators: creatorsPrimary,
    });

  updateProgress?.(ENftProgress.signing_token_transaction);

  const createMetadataTx = new TransactionsBatch({
    instructions: [createMetadataIx, createMasterEditionIx],
  });

  await sendTransactions(connection, wallet, [
    mintToTx,
    createMetadataTx,
    createPrimaryMetadataCreatorsTx,
  ]);

  return {
    mint: mint.publicKey,
    metadata: metadataPDA,
  };
}
