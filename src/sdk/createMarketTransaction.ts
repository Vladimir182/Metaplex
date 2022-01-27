import { createCreateMarketInstruction } from "@metaplex-foundation/mpl-membership-token";
import { Wallet } from "@metaplex/js";
import { bignum, COption } from "@metaplex-foundation/beet";
import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";

export interface CreateMarketTransactionProps {
  wallet: Wallet;
  store: PublicKey;
  sellingResource: PublicKey;
  mint: PublicKey;
  treasuryHolder: PublicKey;
  owner: PublicKey;
  treasuryOwnerBump: number;
  name: string;
  description: string;
  mutable: boolean;
  price: bignum;
  piecesInOneWallet: COption<bignum>;
  startDate: bignum;
  endDate: COption<bignum>;
}

export const createMarketTransaction = ({
  store,
  wallet,
  sellingResource,
  mint,
  treasuryHolder,
  owner,
  treasuryOwnerBump,
  name,
  description,
  mutable,
  price,
  piecesInOneWallet,
  startDate,
  endDate,
}: CreateMarketTransactionProps): {
  market: Keypair;
  createMarketInstruction: TransactionInstruction;
  createMarketSigner: Keypair;
} => {
  const market = Keypair.generate();

  const instruction = createCreateMarketInstruction(
    {
      market: market.publicKey,
      store: store,
      sellingResourceOwner: wallet.publicKey,
      sellingResource,
      mint,
      treasuryHolder,
      owner,
    },
    {
      name,
      description,
      treasuryOwnerBump,
      mutable,
      price,
      piecesInOneWallet,
      startDate,
      endDate,
    }
  );

  return {
    market,
    createMarketInstruction: instruction,
    createMarketSigner: market,
  };
};
