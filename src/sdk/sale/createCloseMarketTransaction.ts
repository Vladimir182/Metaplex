import {
  Connection,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Wallet } from "@metaplex/js";
import { createCloseMarketInstruction } from "@metaplex-foundation/mpl-fixed-price-sale";
import { createAndSignTransaction } from "../createAndSignTransaction";

interface EndSaleProps {
  market: PublicKey;
  connection: Connection;
  wallet: Wallet;
}

export const createCloseMarketTransaction = async ({
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
