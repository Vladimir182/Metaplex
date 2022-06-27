import { Wallet } from "@metaplex/js";
import {
  findPrimaryMetadataCreatorsAddress,
  findTreasuryOwnerAddress,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import {
  Connection,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { createPrimaryMetadataCreators } from "sdk/creators/instructions/createPrimaryMetadataCreators";
import { createAndSignTransaction } from "sdk/transactions/createAndSignTransaction";
import { IFixedPrice } from "state/sales";
import { toPubkey } from "utils/toPubkey";

import { createCreatorWithdraw } from "../instructions/createCreatorWithdraw";

interface WithdrawProps {
  connection: Connection;
  wallet: Wallet;
  sale: IFixedPrice;
}

export const createWithdrawTransaction = async ({
  connection,
  wallet,
  sale,
}: WithdrawProps): Promise<Transaction> => {
  const { artwork } = sale;
  const { treasuryMint, sellingResource } = sale.refs;

  const instructions: TransactionInstruction[] = [];
  const [primaryMetadataCreators] = await findPrimaryMetadataCreatorsAddress(
    toPubkey(artwork.accountAddress)
  );

  const [treasuryOwner, treasuryOwnerBump] = await findTreasuryOwnerAddress(
    toPubkey(treasuryMint),
    toPubkey(sellingResource)
  );

  let primaryCreators = sale.primaryCreators;
  const creators = sale.artwork.creators;

  if (!primaryCreators.length) {
    primaryCreators = creators;

    const createPrimaryMetadataCreatorsInstruction =
      await createPrimaryMetadataCreators({
        wallet,
        creators,
        metadata: toPubkey(artwork.accountAddress),
      });

    instructions.push(createPrimaryMetadataCreatorsInstruction);
  }

  const withdrawInstructions = await Promise.all(
    creators.map(async (creator) =>
      createCreatorWithdraw({
        creator,
        sale,
        wallet,
        treasuryOwner,
        treasuryOwnerBump,
        primaryMetadataCreators,
      })
    )
  );
  instructions.push(...withdrawInstructions);

  return createAndSignTransaction(instructions, connection, wallet, []);
};
