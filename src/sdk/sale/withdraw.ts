import {
  findPayoutTicketAddress,
  createWithdrawInstruction,
  errorFromCode,
  MarketAccountDataArgs,
  findTreasuryOwnerAddress,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Wallet } from "@metaplex/js";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { getErrorForTransaction } from "../getErrorForTransaction";
import { createAndSignTransaction } from "sdk/createAndSignTransaction";

export interface WithdrawProps {
  connection: Connection;
  wallet: Wallet;
  metadata: PublicKey;
  market: PublicKey;
  marketData: MarketAccountDataArgs;
}

const createTransaction = async ({
  connection,
  wallet,
  metadata,
  market,
  marketData,
}: WithdrawProps): Promise<Transaction> => {
  const [payoutTicket, payoutTicketBump] = await findPayoutTicketAddress(
    market,
    wallet.publicKey
  );

  const { treasuryMint, treasuryHolder, sellingResource } = marketData;
  const [treasuryOwner, treasuryOwnerBump] = await findTreasuryOwnerAddress(
    treasuryMint,
    sellingResource
  );

  const destination = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    treasuryMint,
    wallet.publicKey
  );

  const instruction = createWithdrawInstruction(
    {
      market,
      sellingResource,
      metadata,
      treasuryHolder,
      treasuryMint,
      owner: treasuryOwner,
      destination,
      funder: wallet.publicKey,
      payer: wallet.publicKey,
      payoutTicket,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    },
    {
      treasuryOwnerBump,
      payoutTicketBump,
    }
  );

  return createAndSignTransaction([instruction], connection, wallet, []);
};

export const withdraw = async ({
  connection,
  wallet,
  ...rest
}: WithdrawProps): Promise<void> => {
  const withdrawTx = await createTransaction({
    connection,
    wallet,
    ...rest,
  });
  const signedTx = await wallet.signTransaction(withdrawTx);

  const txId = await connection.sendRawTransaction(signedTx.serialize(), {
    skipPreflight: true,
  });

  // Force wait for max confirmations
  await connection.confirmTransaction(txId, "max");

  const [error] = await getErrorForTransaction(connection, txId);

  if (error) {
    const codeError = errorFromCode(parseInt(error, 16));
    throw new Error(codeError?.message || `Raw transaction ${txId} failed`);
  }
};
