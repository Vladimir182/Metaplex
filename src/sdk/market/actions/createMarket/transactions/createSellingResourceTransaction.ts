import { bignum, COption } from "@metaplex-foundation/beet";
import { createInitSellingResourceInstruction } from "@metaplex-foundation/mpl-fixed-price-sale";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  findEditionAddress,
  findMetadataAddress,
} from "sdk/loadArtworks/utils";
import { TransactionsBatch } from "sdk/transactions";
import { Wallet } from "wallet";

export interface CreateInitSellingResourceTransactionProps {
  payer: Wallet;
  store: PublicKey;
  resourceMint: PublicKey;
  vault: Keypair;
  owner: PublicKey;
  resourceToken: PublicKey;
  vaultOwnerBump: number;
  maxSupply: COption<bignum>;
}

export const createSellingResourceTransaction = async ({
  payer,
  store,
  resourceMint,
  vault,
  owner,
  resourceToken,
  vaultOwnerBump,
  maxSupply,
}: CreateInitSellingResourceTransactionProps) => {
  const sellingResource = Keypair.generate();

  const [masterEdition, masterEditionBump] = await findEditionAddress(
    resourceMint
  );

  const [metadataPDA] = await findMetadataAddress(resourceMint);

  const ix = createInitSellingResourceInstruction(
    {
      store,
      admin: payer.publicKey,
      sellingResource: sellingResource.publicKey,
      sellingResourceOwner: payer.publicKey,
      masterEdition,
      resourceMint,
      resourceToken,
      vault: vault.publicKey,
      owner,
      metadata: metadataPDA,
    },
    {
      masterEditionBump,
      vaultOwnerBump,
      maxSupply,
    }
  );

  const createSellingResourceTx = new TransactionsBatch({
    instructions: [ix],
    signers: [sellingResource],
  });

  return {
    sellingResource,
    createSellingResourceTx,
  };
};
