import { Wallet } from "@metaplex/js";
import { bignum, COption } from "@metaplex-foundation/beet";
import { Connection, PublicKey } from "@solana/web3.js";

import { createTreasury } from "./createTreasury";
import { initSellingResource } from "./initSellingResource";
import { createMarketTransaction } from "./createMarketTransaction";
import { createAndSignTransaction } from "./createAndSignTransaction";

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
}

export const createMarket = async (
  params: CreateMarketTransactionProps
): Promise<{ market: string }> => {
  const { connection, wallet } = params;

  const { market, marketTx } = await createTransaction(params);
  const signedTx = await wallet.signTransaction(marketTx);

  const txId = await connection.sendRawTransaction(signedTx.serialize(), {
    skipPreflight: true,
  });

  await connection.confirmTransaction(txId, "recent");

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
