import { AuctionState } from "@metaplex-foundation/mpl-auction";
import dayjs from "dayjs";
import { attach, createStore, forward, StoreValue } from "effector";
import { loadAuctions } from "sdk/loadAuction";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { Listing } from "./types";

export const $allListings = createStore<Listing[]>([]);

export const fetchStoreListingsFx = attach({
  effect: async ({
    connection,
    store,
  }: {
    connection: StoreValue<typeof $connection>;
    store: StoreValue<typeof $store>;
  }) => {
    if (!store) {
      return [];
    }

    return await loadAuctions({
      connection,
      storeId: store.storeId,
    });
  },
  source: {
    connection: $connection,
    store: $store,
  },
});
forward({ from: fetchStoreListingsFx.doneData, to: $allListings });
forward({ from: [$connection, $store], to: fetchStoreListingsFx });

export const $pendingListings = fetchStoreListingsFx.pending;

export const $liveListings = $allListings.map((listings) =>
  listings.filter(
    (listing) =>
      listing.status === AuctionState.Started &&
      (!listing.endedAt || listing.endedAt > dayjs().unix())
  )
);
