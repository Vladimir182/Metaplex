import { attach, createStore, forward, StoreValue } from "effector";
import { loadArtworksByOwner } from "sdk/loadArtworks";
import { IArt } from "state/artworks/types";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";

export const $profileArtworks = createStore<IArt[]>([]);

export const fetchProfileArtworksFx = attach({
  effect: async ({
    connection,
    wallet,
  }: {
    connection: StoreValue<typeof $connection>;
    wallet: StoreValue<typeof $wallet>;
  }) => {
    if (!wallet) {
      return [];
    }

    return await loadArtworksByOwner({
      connection,
      owner: wallet.publicKey,
    });
  },
  source: {
    connection: $connection,
    wallet: $wallet,
  },
});
forward({ from: fetchProfileArtworksFx.doneData, to: $profileArtworks });
// forward({ from: [$connection, $wallet], to: fetchProfileArtworksFx });

export const $pendingProfileArtworks = fetchProfileArtworksFx.pending;
