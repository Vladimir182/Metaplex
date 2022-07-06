import {
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { createMintAccount } from "sdk/share";

export async function prepareTokenAccountAndMintTxs(
  connection: Connection,
  owner: PublicKey
) {
  const { mint, tx } = await createMintAccount({
    connection,
    payer: owner,
  });

  const recipient = await getAssociatedTokenAddress(mint.publicKey, owner);

  const ataIx = createAssociatedTokenAccountInstruction(
    owner,
    recipient,
    owner,
    mint.publicKey
  );

  const mintToIx = createMintToInstruction(mint.publicKey, recipient, owner, 1);

  tx.addInstructions([ataIx, mintToIx]);

  return {
    mint,
    tx,
  };
}
