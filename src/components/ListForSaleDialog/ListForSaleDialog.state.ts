import { Currency } from "@metaplex/js";
import {
  attach,
  createEffect,
  createEvent,
  sample,
  StoreValue,
} from "effector";
import { useEvent, useStore } from "effector-react";
import { useMemo } from "react";
import { $solToUsdRate } from "state/solToUsd";
import { createEntry } from "state/utils";
import { convertCurrency } from "utils/convertCurrency";

interface IToolProps {
  onSubmit?: (price: number, endDate: Date) => void;
}

export function createInstantSaleTools({ onSubmit }: IToolProps = {}) {
  const { $node: $state, set: changeState } = createEntry<
    | { type: "instant-buy" }
    | {
        type: "sale-review";
        price: { sol: number; usd: number };
        endDate: Date;
      }
    | { type: "success" }
    | { type: "wait-sdk" }
  >({ type: "instant-buy" });

  const successEvent = createEvent();

  const submitInstantBuy = createEvent<{ price: number; endDate: Date }>();

  const goToSuccessSourceFx = createEffect(
    ({ state }: { state: StoreValue<typeof $state> }) => {
      if (state.type === "sale-review") {
        onSubmit?.(state.price.sol, state.endDate);
        successEvent();
      }
    }
  );

  const goToSuccessFx = attach({
    source: {
      state: $state,
    },
    effect: goToSuccessSourceFx,
    mapParams: (_: void, source) => source,
  });

  sample({
    clock: submitInstantBuy,
    target: $state,
    source: {
      solToUsdRate: $solToUsdRate,
    },
    fn({ solToUsdRate }, { price, ...params }) {
      const ret: StoreValue<typeof $state> = {
        type: "sale-review",
        price: {
          sol: price,
          usd:
            convertCurrency(price, solToUsdRate, Currency.SOL, Currency.USD) ??
            0,
        },
        ...params,
      };
      return ret;
    },
  });

  sample({
    clock: successEvent,
    source: {
      state: $state,
    },
    target: $state,
    fn({ state }) {
      if (state.type === "sale-review") {
        const ret: StoreValue<typeof $state> = { type: "wait-sdk" };
        return ret;
      }
      return state;
    },
  });

  return { $state, changeState, submitInstantBuy, goToSuccessFx };
}

export const useLocalState = (props?: IToolProps) => {
  const tools = useMemo(() => createInstantSaleTools(props), []);
  const goToSuccess = useEvent(tools.goToSuccessFx);
  const saleState = useStore(tools.$state);
  const submitInstantBuy = useEvent(tools.submitInstantBuy);
  const changeState = useEvent(tools.changeState);
  return {
    saleState,
    submitInstantBuy,
    goToSuccess,
    changeState,
  };
};
