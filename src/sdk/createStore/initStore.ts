import { createCreateStoreInstruction } from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import { ETransactionProgress } from "enums/transactionProgress";
import { waitConfirmation } from "sdk/transactions/waitConfirmation";
import { IStore } from "state/store";
import { Wallet } from "wallet";

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
  const rawTx = signedTx.serialize();
  const txId = await connection.sendRawTransaction(rawTx, {
    skipPreflight: true,
  });
  updateProgress(ETransactionProgress.sending_transaction_to_solana);

  // Force wait for max confirmations
  updateProgress(ETransactionProgress.waiting_for_final_confirmation);

  await waitConfirmation(connection, rawTx, txId);
  return { storeId: store.publicKey.toString() };
};
