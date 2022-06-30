import { MetadataJsonCreator } from "@metaplex/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { createAndSignTransaction } from "sdk/transactions/createAndSignTransaction";
import { Wallet } from "wallet";

import { createPrimaryMetadataCreators } from "../instructions/createPrimaryMetadataCreators";

export interface InitStoreProps {
  wallet: Wallet;
  connection: Connection;
  metadata: PublicKey;
  creators: MetadataJsonCreator[];
}

export const createPrimaryMetadataCreatorsTransaction = async ({
  connection,
  wallet,
  metadata,
  creators,
}: InitStoreProps) => {
  const createPrimaryMetadataCreatorsInstruction =
    await createPrimaryMetadataCreators({ wallet, metadata, creators });

  return createAndSignTransaction(
    [createPrimaryMetadataCreatorsInstruction],
    connection,
    wallet,
    []
  );
};
