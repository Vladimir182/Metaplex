import { MetadataJsonCreator } from "@metaplex/js";
import {
  createSavePrimaryMetadataCreatorsInstruction,
  findPrimaryMetadataCreatorsAddress,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { toPubkey } from "utils/toPubkey";
import { Wallet } from "wallet";

interface CreatePrimaryMetadataCreatorsParams {
  wallet: Wallet;
  creators: MetadataJsonCreator[];
  metadata: PublicKey;
}

export const createPrimaryMetadataCreators = async ({
  wallet,
  creators,
  metadata,
}: CreatePrimaryMetadataCreatorsParams): Promise<TransactionInstruction> => {
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
        creators: creators.map((creator) => ({
          ...creator,
          address: toPubkey(creator.address),
        })),
      }
    );

  return createPrimaryMetadataCreatorsInstruction;
};
