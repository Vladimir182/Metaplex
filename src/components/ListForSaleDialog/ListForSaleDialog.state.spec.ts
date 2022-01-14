import { ConversionRatePair, Currency } from "@metaplex/js";
import { allSettled, fork } from "effector";
import { fetchRateSolToUsdFx } from "state/solToUsd";
import { createInstantSaleTools } from "./ListForSaleDialog.state";

describe("createInstantSaleTools", () => {
  it("submitInstantBuy", async () => {
    const PAIR: ConversionRatePair = {
      from: Currency.SOL,
      to: Currency.USD,
      rate: 10,
    };

    const { $state, submitInstantBuy } = createInstantSaleTools();
    const scope = fork({
      values: [[$state, { type: "instant-buy" }]],
      handlers: [[fetchRateSolToUsdFx, () => Promise.resolve([PAIR])]],
    });

    await allSettled(fetchRateSolToUsdFx, { scope });
    const endDate = new Date();
    await allSettled(submitInstantBuy, {
      scope,
      params: { price: 10, endDate },
    });
    expect(scope.getState($state)).toEqual({
      type: "sale-review",
      endDate,
      price: {
        sol: 10,
        usd: 100,
      },
    });
  });

  it("goToSuccessFx fail", async () => {
    const onSubmit = jest.fn(() => {});
    const { $state, goToSuccessFx } = createInstantSaleTools({ onSubmit });

    const scope = fork({
      values: [[$state, { type: "instant-buy" }]],
    });

    await allSettled(goToSuccessFx, { scope, params: undefined });
    expect(onSubmit.mock.calls.length).toBe(0);
    expect(scope.getState($state)).toEqual({ type: "instant-buy" });
  });

  it("goToSuccessFx done", async () => {
    const onSubmit = jest.fn(() => {});
    const { $state, goToSuccessFx } = createInstantSaleTools({ onSubmit });
    const scope = fork({
      values: [
        [$state, { type: "sale-review", price: 10, endDate: new Date() }],
      ],
    });
    await allSettled(goToSuccessFx, { scope, params: undefined });
    expect(onSubmit.mock.calls.length).toBe(1);
    //expect(scope.getState($state)).toEqual({ type: "success" });
    expect(scope.getState($state)).toEqual({ type: "wait-sdk" });
  });
});
