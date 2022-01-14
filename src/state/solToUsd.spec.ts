import { ConversionRatePair, Currency } from "@metaplex/js";
import { allSettled, fork } from "effector";
import { fetchRateSolToUsdFx, $solToUsdRate } from "./solToUsd";

describe("balance", () => {
  it("$solToUsd", async () => {
    const PAIR: ConversionRatePair = {
      from: Currency.SOL,
      to: Currency.USD,
      rate: 10,
    };
    const fetchRateSolToUsd = jest.fn(() => Promise.resolve([PAIR]));

    const scope = fork({
      handlers: [[fetchRateSolToUsdFx, fetchRateSolToUsd]],
    });

    expect(scope.getState($solToUsdRate)).toBe(null);

    expect(fetchRateSolToUsd.mock.calls.length).toBe(0);

    const defer = allSettled(fetchRateSolToUsdFx, { scope });
    expect(scope.getState($solToUsdRate)).toEqual(null);
    await defer;
    expect(scope.getState($solToUsdRate)).toEqual([PAIR]);
  });
});
