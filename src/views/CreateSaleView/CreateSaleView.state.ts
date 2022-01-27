import { useStore } from "effector-react";
import { useMemo, useCallback, RefObject } from "react";
import { attach, createEffect, createStore, StoreValue } from "effector";

import { CreateSaleSidebarEnum } from "components/CreateSaleSidebar";
import { IForm } from "components/forms/SaleCreate";
import { createEntry } from "state/utils";
import { $storeArtworks, IArt } from "state/artworks";
import { $user, $wallet } from "state/wallet";
import { FormSubmitting } from "utils/FormSubmitting";
import { createMarket } from "sdk/createMarket";
import { $connection } from "state/connection";
import { PublicKey } from "@solana/web3.js";
import { $store } from "state/store";
import {
  DESCRIPTION_MAX_LEN,
  NAME_MAX_LEN,
} from "@metaplex-foundation/mpl-membership-token";

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  store: StoreValue<typeof $store>;
  preview: StoreValue<typeof $preview>;
}

const submitSaleFx = createEffect((data: SubmitFormProps) => data);

export const $preview = createStore<SubmitFormProps | null>(null).on(
  submitSaleFx.doneData,
  (_, preview) => preview
);

const createMarketFx = attach({
  effect: createEffect(
    async ({ store, wallet, connection, preview }: ISource) => {
      if (!preview) {
        return;
      }
      const { startDate, endDate, artwork, price, ...params } = preview;

      if (
        !wallet ||
        !store ||
        !artwork?.mint ||
        !artwork.token ||
        !artwork.prints
      ) {
        return;
      }

      const maxSupply = artwork.prints.maxSupply
        ? artwork.prints.maxSupply - (artwork.prints.supply || 0)
        : null;

      return await createMarket({
        connection,
        wallet,
        store: new PublicKey(store.storeId),
        resourceMint: new PublicKey(artwork.mint),
        resourceToken: new PublicKey(artwork.token),
        startDate: Math.round(startDate.getTime() / 1000),
        endDate: Math.round(endDate.getTime() / 1000),
        name: " ".repeat(NAME_MAX_LEN),
        description: " ".repeat(DESCRIPTION_MAX_LEN),
        piecesInOneWallet: 1,
        mutable: false,
        maxSupply,
        price: Number(price),
        ...params,
      });
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
    preview: $preview,
  },
  mapParams: (_: void, sources) => ({
    ...sources,
  }),
});

interface SubmitFormProps extends IForm {
  artwork: IArt;
}

export function createLocalState() {
  const $state = createEntry<CreateSaleSidebarEnum>(
    CreateSaleSidebarEnum.CONFIGURE
  );

  return {
    $state,
    $preview,
    submitSaleFx,
  };
}

export function useLocalState(
  refForm: RefObject<HTMLFormElement>,
  itemId?: string
) {
  const artworks = useStore($storeArtworks);
  const { $state, $preview, formSubmitting } = useMemo(() => {
    const ret = createLocalState();
    const formSubmitting = new FormSubmitting(ret.submitSaleFx);

    return {
      ...ret,
      formSubmitting,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = useStore($user);

  const step = useStore($state.$node);
  const preview = useStore($preview);

  const artwork = useMemo(
    () => artworks.find(({ id }) => id === itemId),
    [artworks, itemId]
  );

  const artworkSummary = useMemo(() => {
    if (!artwork?.prints) {
      return null;
    }

    return {
      img: artwork.image,
      title: artwork.title,
      artist: "",
      edition: artwork.prints.supply || 0,
      total: artwork.prints.maxSupply || "Unlimited",
    };
  }, [artwork]);

  const onCreateSale = useCallback(async () => {
    return createMarketFx();
  }, []);

  const onSubmitForm = useCallback(
    (data: IForm) => {
      if (!user || !artwork) {
        return;
      }

      formSubmitting.submit({ ...data, artwork });
    },
    [user]
  );

  const onSubmit = useCallback(async () => {
    if (!refForm.current) {
      throw new Error("Uninitialized form");
    }
    await formSubmitting.manualSubmit(refForm.current);
  }, [user]);

  return {
    step,
    preview,
    setStep: $state.set,
    artwork,
    artworkSummary,
    onSubmit,
    onSubmitForm,
    onCreateSale,
  };
}
