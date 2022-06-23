import { Wallet } from "@metaplex/js";
import { bignum, COption } from "@metaplex-foundation/beet";
import { findVaultOwnerAddress } from "@metaplex-foundation/mpl-fixed-price-sale";
import {
  MasterEdition,
  Metadata,
  MetadataProgram,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";

import { createTokenAccount } from "../createTokenAccount";

import { createInitSellingResourceTransaction } from "./initSellingResourceTransaction";

export interface InitSellingResourceProps {
  resourceMint: PublicKey;
  resourceToken: PublicKey;
  store: PublicKey;
  maxSupply: COption<bignum>;
  connection: Connection;
  wallet: Wallet;
}

export const initSellingResource = async ({
  resourceMint,
  resourceToken,
  store,
  maxSupply,
  connection,
  wallet,
}: InitSellingResourceProps): Promise<{
  sellingResource: Keypair;
  initSellingResourceInstructions: TransactionInstruction[];
  sellingResourceSigners: Keypair[];
}> => {
  const [vaultOwner, vaultOwnerBump] = await findVaultOwnerAddress(
    resourceMint,
    store
  );

  const { tokenAccount: vault, instructions } = await createTokenAccount({
    payer: wallet.publicKey,
    mint: resourceMint,
    connection,
    owner: vaultOwner,
  });

  const [masterEdition, masterEditionBump] = await findMasterEditionPDA(
    resourceMint
  );

  const metadataPDA = await Metadata.getPDA(resourceMint);

  const { instruction, signers, sellingResource } =
    createInitSellingResourceTransaction({
      payer: wallet,
      store,
      masterEdition,
      masterEditionBump,
      resourceMint,
      resourceToken,
      vault,
      owner: vaultOwner,
      vaultOwnerBump,
      maxSupply,
      metadata: metadataPDA,
    });

  return {
    sellingResource,
    initSellingResourceInstructions: [...instructions, instruction],
    sellingResourceSigners: [vault, ...signers],
  };
};

const findMasterEditionPDA = (mint: PublicKey) =>
  PublicKey.findProgramAddress(
    [
      Buffer.from(MetadataProgram.PREFIX),
      MetadataProgram.PUBKEY.toBuffer(),
      mint.toBuffer(),
      Buffer.from(MasterEdition.EDITION_PREFIX),
    ],
    MetadataProgram.PUBKEY
  );
