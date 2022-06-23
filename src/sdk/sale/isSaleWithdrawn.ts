import { Wallet } from "@metaplex/js";
import { findPayoutTicketAddress } from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection, PublicKey } from "@solana/web3.js";

export const isSaleWithdrawn = async ({
  connection,
  marketKey,
  wallet,
}: {
  connection: Connection;
  marketKey: string;
  wallet: Wallet;
}) => {
  const [payoutTicket] = await findPayoutTicketAddress(
    new PublicKey(marketKey),
    wallet.publicKey
  );

  const payoutAccount = await connection.getAccountInfo(payoutTicket);

  return Boolean(payoutAccount);
};
