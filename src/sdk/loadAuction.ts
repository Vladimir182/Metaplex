import { Auction, AuctionExtended } from "@metaplex-foundation/mpl-auction";
import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { AuctionManager } from "@metaplex-foundation/mpl-metaplex";
import { Vault } from "@metaplex-foundation/mpl-token-vault";
import { Connection } from "@solana/web3.js";
import { InstantSale } from "state/listing/types";
import { excludesFalsy } from "utils/excludeFalsy";
import { lamportsToSol } from "utils/lamportsToSol";
import { loadArtworkByMint } from "./loadArtworks";

export const loadAuctions = async ({
  connection,
  storeId,
}: {
  connection: Connection;
  storeId: AnyPublicKey;
}) => {
  const accounts = await AuctionManager.findMany(connection, {
    store: storeId,
  });

  const auctions = await Promise.all(
    accounts.map((account) => loadInstantSale({ connection, manager: account }))
  );

  return auctions.filter(excludesFalsy);
};

export const loadInstantSale = async ({
  connection,
  manager,
}: {
  connection: Connection;
  manager: AuctionManager;
}) => {
  const [auction, auctionExtended] = await Promise.all([
    await manager.getAuction(connection),
    await AuctionExtended.getPDA(manager.data.vault).then((id) =>
      AuctionExtended.load(connection, id)
    ),
  ]);

  if (!isInstantSale(auction, auctionExtended)) {
    return null;
  }

  const vault = await Vault.load(connection, manager.data.vault);
  const [box] = await vault.getSafetyDepositBoxes(connection);

  const artwork = await loadArtworkByMint({
    connection,
    mint: box.data.tokenMint,
  });

  // TODO: get count of sales (open, limited, masterEdition)

  return {
    refs: {
      acceptPayment: manager.data.acceptPayment,
      auction: manager.data.auction,
      vault: manager.data.vault,
      manager: manager.pubkey.toString(),
      authority: manager.data.authority,
    },
    price: lamportsToSol(
      auctionExtended.data.instantSalePrice?.toNumber() as number
    ),
    status: auction.data.state,
    endedAt: auction.data.endedAt?.toNumber(),
    artwork,
  } as InstantSale;
};

export const isInstantSale = (
  {
    data: {
      priceFloor: { minPrice },
    },
  }: Auction,
  { data: { instantSalePrice } }: AuctionExtended
) => !!instantSalePrice && !!minPrice && instantSalePrice.eq(minPrice);
