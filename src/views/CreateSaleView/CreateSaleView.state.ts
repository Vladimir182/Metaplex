import { useStore } from "effector-react";
import { useMemo, useCallback, RefObject } from "react";
import { attach, createEffect, StoreValue } from "effector";

import { CreateSaleSidebarEnum } from "components/CreateSaleSidebar";
import { IForm } from "components/forms/SaleCreate";
import { useToast } from "components/modals/Toast";
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

export interface IParams {
  price: string;
  startDate: Date;
  endDate: Date;
  artwork: IArt;
}

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  store: StoreValue<typeof $store>;
}

export type IParamsWithSource = IParams & ISource;

const createMarketFx = attach({
  effect: createEffect(
    async ({
      store,
      wallet,
      startDate,
      endDate,
      artwork,
      price,
      ...params
    }: IParamsWithSource) => {
      if (!artwork?.mint || !artwork.token) {
        throw new Error("No artwork");
      }
      if (!artwork?.prints) {
        throw new Error("Artwork can't have prints");
      }
      if (!wallet) {
        throw new Error("Wallet wasn't connected");
      }
      if (!store) {
        throw new Error("Store isnt't created");
      }

      const maxSupply = artwork.prints.maxSupply
        ? artwork.prints.maxSupply - (artwork.prints.supply || 0)
        : null;

      const market = await createMarket({
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

      return market;
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
  },
  mapParams: (params: IParams, sources) => ({
    ...sources,
    ...params,
  }),
});

interface SubmitFormProps extends IForm {
  artwork: IArt;
}

export function createLocalState() {
  const $state = createEntry<CreateSaleSidebarEnum>(
    CreateSaleSidebarEnum.CONFIGURE
  );
  const $preview = createEntry<Partial<SubmitFormProps>>({});

  const submitSaleFx = createEffect(async (data: SubmitFormProps) => {
    $preview.set(data);

    await createMarketFx(data);
  });

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
  const toast = useToast();

  const step = useStore($state.$node);
  const preview = useStore($preview.$node);

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

  const onSubmitForm = useCallback(
    (data: IForm) => {
      if (!user) {
        toast({
          title: "Transaction Failed",
          text: "Your transaction failed because your wallet is not connected.",
          duration: 9000,
        });
        return;
      }
      if (!artwork) {
        toast({
          title: "Transaction Failed",
          text: "Your transaction failed because no artwork.",
          duration: 9000,
        });
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
  };
}
