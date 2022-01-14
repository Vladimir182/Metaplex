import { AuctionExtended } from "@metaplex-foundation/mpl-auction";
import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { AuctionManager } from "@metaplex-foundation/mpl-metaplex";
import { Vault } from "@metaplex-foundation/mpl-token-vault";
import { actions, Connection, Wallet } from "@metaplex/js";
import { PublicKey } from "@solana/web3.js";

const { placeBid, redeemParticipationBidV3, cancelBid } = actions;

interface Params {
  connection: Connection;
  wallet: Wallet;
  auction: AnyPublicKey;
}

export const buyInstantSale = async ({
  connection,
  wallet,
  auction,
}: Params) => {
  const txIds = [];
  // get data for transactions
  const auctionManagerPDA = await AuctionManager.getPDA(auction);
  const manager = await AuctionManager.load(connection, auctionManagerPDA);
  const vault = await Vault.load(connection, manager.data.vault);
  const auctionExtendedPDA = await AuctionExtended.getPDA(vault.pubkey);
  const {
    data: { instantSalePrice },
  } = await AuctionExtended.load(connection, auctionExtendedPDA);

  const { txId: placeBidTxId, bidderPotToken } = await placeBid({
    connection,
    wallet,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    amount: instantSalePrice!,
    auction: new PublicKey(auction),
  });
  txIds.push(placeBidTxId);

  // wait for all accounts to be created
  await connection.confirmTransaction(placeBidTxId, "finalized");

  try {
    await redeemParticipationBidV3({
      connection,
      wallet,
      store: new PublicKey(manager.data.store),
      auction: new PublicKey(auction),
    });
  } catch (e) {
    cancelBid({
      connection,
      wallet,
      auction: new PublicKey(auction),
      bidderPotToken,
    });
    throw e;
  }
};
