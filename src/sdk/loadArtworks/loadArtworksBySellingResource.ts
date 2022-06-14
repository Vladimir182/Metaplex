import BN from "bn.js";
import {
  MarketState,
  MarketArgs,
  SellingResourceArgs,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import { Wallet } from "@metaplex/js";
import { Connection } from "@solana/web3.js";
import dayjs from "dayjs";

import { IArt } from "state/artworks/types";
import { loadSellingResourcesTokenAccounts } from "../loadSellingResources";
import { isSaleWithdrawn } from "../sale/isSaleWithdrawn";
import { lamportsToSol } from "utils/lamportsToSol";
import { loadArtworksByAccounts } from "./loadArtworksByAccounts";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const loadArtworksBySellingResource = async ({
  connection,
  sellingResources,
  markets,
  wallet,
}: {
  connection: Connection;
  sellingResources: Map<string, SellingResourceArgs>;
  markets: Map<string, MarketArgs>;
  wallet: Wallet;
}): Promise<IArt[]> => {
  const accounts = await loadSellingResourcesTokenAccounts({
    connection,
    sellingResources,
  });

  const artworks = await loadArtworksByAccounts({
    connection,
    accounts: accounts.filter((acc) => acc.data.amount.toNumber() !== 0),
  });

  const storeArtworksWithState = await Promise.all(
    artworks.map(async (artwork) => {
      const [sellingResource, sellingResourceData] =
        Array.from(sellingResources).find(
          ([, data]) => data.vault.toBase58() === artwork.token
        ) || [];

      if (!sellingResourceData) return artwork;

      const market = Array.from(markets).find(
        ([, data]) => data.sellingResource.toBase58() === sellingResource
      );

      if (!market) return artwork;

      const [marketKey, { price, state, startDate, endDate }] = market;

      const saleStartDate = startDate && dayjs.unix(Number(startDate));
      const saleEndDate = endDate && dayjs.unix(Number(endDate));
      const salePrice = lamportsToSol(new BN(price).toNumber());
      const supply = new BN(sellingResourceData.supply).toNumber();
      const primarySaleAmount = salePrice * supply;

      const isMarketStarted =
        !!saleStartDate &&
        dayjs(saleStartDate).isSameOrBefore(dayjs()) &&
        [MarketState.Active, MarketState.Created].includes(state);

      const updatedState = isMarketStarted ? MarketState.Active : state;

      // Check if item was claimed already
      const isWithdrawn =
        state === MarketState.Ended &&
        (await isSaleWithdrawn({
          connection,
          wallet,
          marketKey,
        }));

      return {
        ...artwork,
        ...(saleStartDate && { startDate: saleStartDate }),
        ...(saleEndDate && { endDate: saleEndDate }),
        market: marketKey,
        state: updatedState,
        isWithdrawn,
        primarySaleAmount,
      };
    })
  );

  return storeArtworksWithState;
};
