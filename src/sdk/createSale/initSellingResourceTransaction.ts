import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { bignum, COption } from "@metaplex-foundation/beet";
import { createInitSellingResourceInstruction } from "@metaplex-foundation/mpl-membership-token";
import { Wallet } from "@metaplex/js";

export interface CreateInitSellingResourceTransactionProps {
  payer: Wallet;
  store: PublicKey;
  resourceMint: PublicKey;
  masterEdition: PublicKey;
  vault: Keypair;
  owner: PublicKey;
  resourceToken: PublicKey;
  masterEditionBump: number;
  vaultOwnerBump: number;
  maxSupply: COption<bignum>;
}

export const createInitSellingResourceTransaction = ({
  payer,
  store,
  resourceMint,
  masterEdition,
  vault,
  owner,
  resourceToken,
  masterEditionBump,
  vaultOwnerBump,
  maxSupply,
}: CreateInitSellingResourceTransactionProps): {
  sellingResource: Keypair;
  instruction: TransactionInstruction;
  signers: Keypair[];
} => {
  const sellingResource = Keypair.generate();

  const instruction = createInitSellingResourceInstruction(
    {
      store: store,
      admin: payer.publicKey,
      sellingResource: sellingResource.publicKey,
      sellingResourceOwner: payer.publicKey,
      masterEdition,
      resourceMint,
      resourceToken,
      vault: vault.publicKey,
      owner,
    },
    {
      masterEditionBump,
      vaultOwnerBump,
      maxSupply,
    }
  );

  return {
    sellingResource,
    instruction,
    signers: [sellingResource, vault],
  };
};
