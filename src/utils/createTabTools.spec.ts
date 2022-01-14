import { createTabTools } from "./createTabTools";
import { getArtworks } from "state/artworks/artworks.mock";
import { createStore, fork } from "effector";
import { ArtType } from "state/artworks/types";

describe("createTabTools", () => {
  let entry: ReturnType<typeof createTabTools>;
  const $artworks = createStore<ReturnType<typeof getArtworks>>([]);
  beforeEach(() => {
    entry = createTabTools($artworks, "all");
  });

  it("$tab:all $artworksFilters", () => {
    const list = getArtworks();
    const scope = fork({
      values: [
        [$artworks, list],
        [entry.$tab.$node, "all"],
      ],
    });
    expect(scope.getState(entry.$artworksFilters)).toEqual(list);
  });

  it("$tab:masters $artworksFilters", () => {
    const scope = fork({
      values: [
        [$artworks, getArtworks()],
        [entry.$tab.$node, "masters"],
      ],
    });
    const result = scope.getState(entry.$artworksFilters);

    expect(result.every((t) => t.type === ArtType.Master)).toBeTruthy();
  });

  it("$tab:editions $artworksFilters", () => {
    const scope = fork({
      values: [
        [$artworks, getArtworks()],
        [entry.$tab.$node, "editions"],
      ],
    });
    const result = scope.getState(entry.$artworksFilters);
    expect(result.every((t) => t.type !== ArtType.Master)).toBeTruthy();
  });
});
