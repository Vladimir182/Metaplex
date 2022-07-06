import { findTreasuryOwnerAddress } from "@metaplex-foundation/mpl-fixed-price-sale";
import { NATIVE_MINT } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { createTokenAccount } from "sdk/share";
import { Wallet } from "wallet";

export interface CreateTreasuryProps {
  connection: Connection;
  wallet: Wallet;
  sellingResource: PublicKey;
}

export const createTreasuryTransaction = async ({
  sellingResource,
  connection,
  wallet,
}: CreateTreasuryProps) => {
  const treasuryMint = NATIVE_MINT;
  const [treasuryOwner, treasuryOwnerBump] = await findTreasuryOwnerAddress(
    treasuryMint,
    sellingResource
  );

  const { tokenAccount: treasuryHolder, tx: createTreasuryTx } =
    await createTokenAccount({
      payer: wallet.publicKey,
      connection,
      mint: treasuryMint,
      owner: treasuryOwner,
    });

  return {
    treasuryOwnerBump,
    treasuryHolder,
    treasuryOwner,
    treasuryMint,
    createTreasuryTx,
  };
};
