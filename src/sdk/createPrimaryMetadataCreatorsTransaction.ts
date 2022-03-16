import {
  findPrimaryMetadataCreatorsAddress,
  createSavePrimaryMetadataCreatorsInstruction,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Wallet } from "@metaplex/js";
import { Creator } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/types";

export interface InitStoreProps {
  wallet: Wallet;
  connection: Connection;
  metadata: PublicKey;
  creators: Creator[];
}

export const createPrimaryMetadataCreatorsTransaction = async ({
  connection,
  wallet,
  metadata,
  creators,
}: InitStoreProps) => {
  const [primaryMetadataCreators, primaryMetadataCreatorsBump] =
    await findPrimaryMetadataCreatorsAddress(metadata);

  const createPrimaryMetadataCreatorsInstruction =
    createSavePrimaryMetadataCreatorsInstruction(
      {
        admin: wallet.publicKey,
        metadata,
        primaryMetadataCreators,
      },
      {
        primaryMetadataCreatorsBump,
        creators,
      }
    );

  const createPrimaryMetadataCreatorsTx = new Transaction();
  createPrimaryMetadataCreatorsTx.add(createPrimaryMetadataCreatorsInstruction);

  createPrimaryMetadataCreatorsTx.recentBlockhash = (
    await connection.getRecentBlockhash()
  ).blockhash;
  createPrimaryMetadataCreatorsTx.feePayer = wallet.publicKey;

  return { createPrimaryMetadataCreatorsTx, primaryMetadataCreators };
};
