import { Wallet } from "@metaplex/js";
import { bignum, COption } from "@metaplex-foundation/beet";
import { Connection, PublicKey } from "@solana/web3.js";

import { ETransactionProgress } from "enums/transactionProgress";

import { createTreasury } from "./createTreasury";
import { initSellingResource } from "./initSellingResource";
import { createMarketTransaction } from "./createMarketTransaction";
import { createAndSignTransaction } from "../createAndSignTransaction";
import { getErrorForTransaction } from "../getErrorForTransaction";

export interface CreateMarketTransactionProps {
  wallet: Wallet;
  connection: Connection;
  store: PublicKey;
  resourceMint: PublicKey;
  resourceToken: PublicKey;
  name: string;
  description: string;
  mutable: boolean;
  price: bignum;
  piecesInOneWallet: COption<bignum>;
  startDate: bignum;
  endDate: COption<bignum>;
  maxSupply: COption<bignum>;
  updateProgress: (status: ETransactionProgress | null) => void;
}

export const createMarket = async (
  params: CreateMarketTransactionProps
): Promise<{ market: string }> => {
  const { connection, wallet, updateProgress } = params;

  const { market, marketTx } = await createTransaction(params);
  updateProgress(ETransactionProgress.creating_transaction);

  const signedTx = await wallet.signTransaction(marketTx);
  updateProgress(ETransactionProgress.signing_transaction);

  updateProgress(ETransactionProgress.sending_transaction_to_solana);
  const txId = await connection.sendRawTransaction(signedTx.serialize(), {
    skipPreflight: true,
  });

  updateProgress(ETransactionProgress.waiting_for_final_confirmation);

  await connection.confirmTransaction(txId, "max");

  const errors = await getErrorForTransaction(connection, txId);

  updateProgress(null);

  if (errors?.length) {
    throw new Error(`Raw transaction ${txId} failed`);
  }

  return { market: market.publicKey.toBase58() };
};

const createTransaction = async ({
  wallet,
  connection,
  store,
  resourceMint,
  resourceToken,
  name,
  description,
  mutable,
  price,
  piecesInOneWallet,
  startDate,
  endDate,
  maxSupply,
}: CreateMarketTransactionProps) => {
  const {
    initSellingResourceInstructions,
    sellingResourceSigners,
    sellingResource,
  } = await initSellingResource({
    resourceMint,
    resourceToken,
    store,
    maxSupply,
    connection,
    wallet,
  });

  const {
    createTreasuryInstructions,
    createTreasurySigners,
    treasuryMint,
    treasuryOwner,
    treasuryOwnerBump,
    treasuryHolder,
  } = await createTreasury({
    sellingResource: sellingResource.publicKey,
    connection,
    wallet,
  });

  const { createMarketInstruction, createMarketSigner, market } =
    createMarketTransaction({
      store,
      wallet,
      sellingResource: sellingResource.publicKey,
      mint: treasuryMint,
      treasuryHolder: treasuryHolder.publicKey,
      owner: treasuryOwner,
      treasuryOwnerBump,
      name,
      description,
      mutable,
      price,
      piecesInOneWallet,
      startDate,
      endDate,
    });

  const marketTx = await createAndSignTransaction(
    [
      ...initSellingResourceInstructions,
      ...createTreasuryInstructions,
      createMarketInstruction,
    ],
    connection,
    wallet,
    [...sellingResourceSigners, ...createTreasurySigners, createMarketSigner]
  );

  return {
    market,
    marketTx,
  };
};