import { createCreateStoreInstruction } from "@metaplex-foundation/mpl-fixed-price-sale";
import { Wallet } from "@metaplex/js";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import { IStore } from "state/store";
import { ETransactionProgress } from "enums/transactionProgress";

export interface InitStoreProps {
  name: string;
  connection: Connection;
  wallet: Wallet;
  updateProgress: (status: ETransactionProgress | null) => void;
}

const createTransaction = async ({
  name,
  connection,
  wallet,
}: InitStoreProps) => {
  const store = Keypair.generate();

  const instruction = createCreateStoreInstruction(
    {
      store: store.publicKey,
      admin: wallet.publicKey,
    },
    {
      name,
      description: " ".repeat(60),
    }
  );

  const storeTx = new Transaction();
  storeTx.add(instruction);
  storeTx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  storeTx.feePayer = wallet.publicKey;
  storeTx.partialSign(store);

  return { store, storeTx };
};

export const initStore = async ({
  name,
  connection,
  wallet,
  updateProgress,
}: InitStoreProps): Promise<Pick<IStore, "storeId">> => {
  updateProgress(ETransactionProgress.creating_transaction);
  const { store, storeTx } = await createTransaction({
    name,
    connection,
    wallet,
    updateProgress,
  });
  updateProgress(ETransactionProgress.signing_transaction);
  const signedTx = await wallet.signTransaction(storeTx);

  const txId = await connection.sendRawTransaction(signedTx.serialize(), {
    skipPreflight: true,
  });
  updateProgress(ETransactionProgress.sending_transaction_to_solana);

  // Force wait for max confirmations
  await connection.confirmTransaction(txId, "max");
  updateProgress(ETransactionProgress.waiting_for_final_confirmation);

  return { storeId: store.publicKey.toString() };
};
