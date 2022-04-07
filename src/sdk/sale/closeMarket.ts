import { createCloseMarketInstruction } from "@metaplex-foundation/mpl-fixed-price-sale";
import { errorFromCode } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/generated/errors";
import { Wallet } from "@metaplex/js";
import {
  Connection,
  PublicKey,
  Transaction,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";
import { createAndSignTransaction } from "sdk/createAndSignTransaction";
import { getErrorForTransaction } from "../getErrorForTransaction";

export interface EndSaleProps {
  market: PublicKey;
  connection: Connection;
  wallet: Wallet;
}

const createTransaction = async ({
  market,
  connection,
  wallet,
}: EndSaleProps): Promise<Transaction> => {
  const instruction = createCloseMarketInstruction({
    market,
    owner: wallet.publicKey,
    clock: SYSVAR_CLOCK_PUBKEY,
  });

  return createAndSignTransaction([instruction], connection, wallet, []);
};

export const closeMarket = async ({
  market,
  connection,
  wallet,
}: EndSaleProps): Promise<void> => {
  const closeMarketTx = await createTransaction({
    market,
    connection,
    wallet,
  });
  const signedTx = await wallet.signTransaction(closeMarketTx);

  const txId = await connection.sendRawTransaction(signedTx.serialize(), {
    skipPreflight: true,
  });

  // Force wait for max confirmations
  await connection.confirmTransaction(txId, "max");

  const [error] = await getErrorForTransaction(connection, txId);

  if (error) {
    const codeError = errorFromCode(parseInt(error, 16));
    throw new Error(codeError?.message || `Raw transaction ${txId} failed`);
  }
};
