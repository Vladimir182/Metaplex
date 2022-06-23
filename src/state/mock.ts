import { createEvent, forward, Store } from "effector";

import { getArtworks } from "./artworks/artworks.mock";
import { $storeArtworks } from "./artworks";

function init<T>(store: Store<T>, data?: T) {
  const set = createEvent<T>();
  forward({ from: set, to: store });
  if (data !== undefined) {
    set(data);
  }

  return set;
}

init($storeArtworks, getArtworks());
