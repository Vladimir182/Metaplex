import { attach, createEffect, StoreValue } from "effector";
import { useCallback, useMemo, useState } from "react";
import { buyInstantSale } from "sdk/buyInstantSale";
import { $connection } from "state/connection";
import { Listing } from "state/listing";
import { $store } from "state/store";
import { $wallet } from "state/wallet";

interface Props {
  listing: Listing;
  onSubmit?: (price: number, endDate: Date) => void;
}

interface ISubmitProps {
  listing: Listing;
}

export const createPurchaseTool = () => {
  const purchaseFx = attach({
    effect: createEffect(
      async ({
        listing,
        wallet,
        connection,
        store,
      }: ISubmitProps & {
        wallet: StoreValue<typeof $wallet>;
        connection: StoreValue<typeof $connection>;
        store: StoreValue<typeof $store>;
      }) => {
        if (!wallet) {
          throw new Error(`Wallet wasn't connected`);
        }
        if (!store) {
          throw new Error(`Store is not defined`);
        }

        await buyInstantSale({
          connection,
          wallet,
          auction: listing.refs.auction,
        });
      }
    ),
    source: {
      wallet: $wallet,
      connection: $connection,
      store: $store,
    },
    mapParams({ listing }: ISubmitProps, sources) {
      return { listing, ...sources };
    },
  });
  return { purchaseFx };
};

export const useLocalState = (props: Props) => {
  const { purchaseFx } = useMemo(() => createPurchaseTool(), []);

  const [state, setState] = useState<
    "confirm" | "queue" | "success" | "sold-out"
  >("confirm");

  const proceedPurchase = useCallback(async () => {
    setState("queue");
    try {
      await purchaseFx({ listing: props.listing });
      setState("success");
    } catch {
      setState("sold-out");
    }
  }, [setState, state]);

  return {
    state,
    proceedPurchase,
  };
};
