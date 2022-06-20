import { allSettled, fork } from "effector";

import { $solToUsdRate, fetchRatesFx } from "./solToUsd";
import { ConversionRatePair, Currency } from "./types";

describe("balance", () => {
  it("$solToUsd", async () => {
    const PAIR: ConversionRatePair = {
      from: Currency.SOL,
      to: Currency.USD,
      rate: 10,
    };
    const fetchRateSolToUsd = jest.fn(() => Promise.resolve([PAIR]));

    const scope = fork({
      handlers: [[fetchRatesFx, fetchRateSolToUsd]],
    });

    expect(scope.getState($solToUsdRate)).toBe(null);

    expect(fetchRateSolToUsd.mock.calls.length).toBe(0);

    const defer = allSettled(fetchRatesFx, { scope });
    expect(scope.getState($solToUsdRate)).toEqual(null);
    await defer;
    expect(scope.getState($solToUsdRate)).toEqual([PAIR]);
  });
});
