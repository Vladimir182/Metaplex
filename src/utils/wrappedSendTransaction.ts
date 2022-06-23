import { actions, Connection, Wallet } from "@metaplex/js";
import { Transaction } from "@metaplex-foundation/mpl-core";
import { Keypair, SendOptions } from "@solana/web3.js";
const { sendTransaction } = actions;

interface ISendTransactionParams {
  connection: Connection;
  wallet: Wallet;
  txs: Transaction[];
  signers?: Keypair[];
  options?: SendOptions;
}

type WrapperSetTransaction = (
  params: ISendTransactionParams
) => Promise<string>;

export const wrappedSendTransaction: WrapperSetTransaction = async (params) => {
  try {
    const responce = await sendTransaction(params);
    return responce;
  } catch (e) {
    return Promise.reject();
  }
};
