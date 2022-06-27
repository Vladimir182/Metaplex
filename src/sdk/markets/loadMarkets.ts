import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import {
  FixedPriceSaleProgram,
  Market,
  SellingResource,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Connection } from "@solana/web3.js";
import { loadArtworksByAccounts } from "sdk/loadArtworks";
import { loadAccountAndDeserialize } from "sdk/share";
import { IFixedPrice } from "state/sales";
import { excludesFalsy } from "utils/excludeFalsy";
import { Wallet } from "wallet";

import { combineMarket } from "./utils/combineMarket";
import { loadMarketsTokenAccounts } from "./loadMarketsTokenAccounts";
import { loadPrimaryCreatorsForArtworks } from "./loadPrimaryCreators";

const MARKET_DATA_SIZE = 395;

const getMarkets = async (
  store: string,
  connection: Connection,
  wallet: Wallet
): Promise<IFixedPrice[]> => {
  const marketAccounts = await FixedPriceSaleProgram.getProgramAccounts(
    connection,
    {
      filters: [
        {
          dataSize: MARKET_DATA_SIZE,
        },
        // Filter for assigned to this store
        {
          memcmp: {
            offset: 8,
            bytes: store,
          },
        },
      ],
    }
  );

  const markets = (
    await Promise.all(
      marketAccounts.map(async (account) => {
        if (!account?.info) return;

        const [market] = Market.deserialize(account.info.data);

        const sellingResource: SellingResource =
          await loadAccountAndDeserialize(
            connection,
            SellingResource,
            market.sellingResource
          );

        if (!sellingResource) return;

        return combineMarket(
          market,
          sellingResource,
          account.pubkey.toString(),
          connection,
          wallet
        );
      })
    )
  ).filter(excludesFalsy);

  const accounts = await loadMarketsTokenAccounts({ connection, markets });
  const artworks = await loadArtworksByAccounts({
    connection,
    accounts,
  });

  const artToPrimaryCreatorsMap = await loadPrimaryCreatorsForArtworks(
    connection,
    artworks
  );

  const salesWithArtworks = artworks.map((artwork) => {
    if (markets.length < 1) {
      return null;
    }
    const market = markets.find(
      (market) => market.refs.resource === artwork.mint && !market.isWithdrawn
    );
    if (!market) {
      return null;
    }

    const primaryCreators = artToPrimaryCreatorsMap.get(artwork.id) || [];

    const sale: IFixedPrice = {
      ...market,
      artwork,
      primaryCreators,
    };

    return sale;
  });

  return salesWithArtworks.filter(excludesFalsy);
};

export const loadMarkets = async ({
  store,
  connection,
  wallet,
}: {
  store: StringPublicKey;
  connection: Connection;
  wallet: Wallet;
}): Promise<IFixedPrice[]> => {
  try {
    return getMarkets(store, connection, wallet);
  } catch {
    return [];
  }
};
