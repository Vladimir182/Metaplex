import { allSettled, fork } from "effector";
import { createEntry } from "./utils";

describe("state/utils", () => {
  it("createEntry", async () => {
    const entry = createEntry(0);

    const scope = fork();

    expect(scope.getState(entry.$node)).toBe(0);

    await allSettled(entry.set, { scope, params: 1 });

    expect(scope.getState(entry.$node)).toBe(1);
  });
});
