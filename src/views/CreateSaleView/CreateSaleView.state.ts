import BN from "bn.js";
import { useStore } from "effector-react";
import { useMemo, useCallback, RefObject } from "react";
import {
  attach,
  createEvent,
  createEffect,
  createStore,
  StoreValue,
  forward,
} from "effector";

import { CreateSaleSidebarEnum } from "views/CreateSaleView/components/CreateSaleSidebar";
import { IForm } from "components/forms/SaleCreate";
import { createEntry } from "state/utils";
import { $storeArtworks, IArt } from "state/artworks";
import { $user, $wallet } from "state/wallet";
import { FormSubmitting } from "utils/FormSubmitting";
import { createMarket } from "sdk/createSale/createMarket";
import { $connection } from "state/connection";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { $store } from "state/store";
import {
  DESCRIPTION_MAX_LEN,
  NAME_MAX_LEN,
} from "@metaplex-foundation/mpl-fixed-price-sale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { createProgressTools } from "utils/createProgressTools";
import { ETransactionProgress } from "../../enums/transactionProgress";
import { waitForResponse } from "utils/waitForResponse";
import { loadMarket } from "sdk/loadMarkets";

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  store: StoreValue<typeof $store>;
  preview: StoreValue<typeof $preview>;
}
export interface IParams {
  updateProgress: (status: ETransactionProgress | null) => void;
}

const submitSaleFx = createEffect((data: SubmitFormProps) => data);

export const $preview = createStore<SubmitFormProps | null>(null).on(
  submitSaleFx.doneData,
  (_, preview) => preview
);

const $error = createStore<{
  error: Error;
} | null>(null);

const resetErrorTrigger = createEvent();

$error.reset(resetErrorTrigger);

const createMarketFx = attach({
  effect: createEffect(
    async ({
      store,
      wallet,
      connection,
      preview,
      updateProgress,
    }: ISource & IParams) => {
      if (!preview) {
        return;
      }
      const { startDate, artwork, price, ...params } = preview;

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

      dayjs.extend(utc);

      const piecesInOneWallet = !params?.piecesInOneWallet
        ? null
        : params.piecesInOneWallet;

      const { market } = await createMarket({
        connection,
        wallet,
        store: new PublicKey(store.storeId),
        resourceMint: new PublicKey(artwork.mint),
        resourceToken: new PublicKey(artwork.token),
        startDate: dayjs.utc(startDate).unix() + 90,
        endDate: null,
        name: " ".repeat(NAME_MAX_LEN),
        description: " ".repeat(DESCRIPTION_MAX_LEN),
        mutable: true,
        maxSupply,
        price: new BN(Number(price) * LAMPORTS_PER_SOL),
        piecesInOneWallet,
        updateProgress,
      });
      await waitForResponse(
        async () => await loadMarket({ connection, marketId: market })
      );
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
    store: $store,
    preview: $preview,
  },
  mapParams: ({ updateProgress }: IParams, sources) => ({
    ...sources,
    updateProgress,
  }),
});

interface SubmitFormProps extends IForm {
  artwork: IArt;
}

function getContent(state: ETransactionProgress | null) {
  switch (state) {
    case ETransactionProgress.creating_transaction:
      return {
        title: "Signing Creation Transaction",
        subtitle: "Approve the transaction from your wallet",
      };
    case ETransactionProgress.signing_transaction:
      return {
        title: "Signing Transaction",
        subtitle: "Approve the transaction from your wallet",
      };
    case ETransactionProgress.sending_transaction_to_solana:
      return {
        title: "Sending Transaction to Solana",
        subtitle: "This will take a few seconds",
      };
    case ETransactionProgress.waiting_for_final_confirmation:
      return {
        title: "Waiting for Final Confirmation",
        subtitle: "",
      };
    default:
      return {
        title: "",
        subtitle: "",
      };
  }
}

export function createLocalState() {
  const { $progressMeta, $progress } = createProgressTools(
    getContent,
    null as ETransactionProgress | null
  );

  const $state = createEntry<CreateSaleSidebarEnum>(
    CreateSaleSidebarEnum.CONFIGURE
  );

  const $shouldSuccess = createEntry<boolean>(false);

  forward({ from: createMarketFx.fail, to: $error });

  return {
    $state,
    error: $error,
    $shouldSuccess,
    $preview,
    submitSaleFx,
    $progressMeta,
    $progress,
  };
}

export function useLocalState(
  refForm: RefObject<HTMLFormElement>,
  itemId?: string
) {
  const artworks = useStore($storeArtworks);
  const {
    $state,
    $preview,
    $progress,
    $progressMeta,
    formSubmitting,
    error,
    $shouldSuccess,
  } = useMemo(() => {
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
  const progressMeta = useStore($progressMeta);
  const shouldSuccess = useStore($shouldSuccess.$node);

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
    try {
      await createMarketFx({
        updateProgress: (state) => $progress.set(state),
      });
      $shouldSuccess.set(true);
    } catch {
      $progress.set(null);
      // TODO: introduce error logging
    }
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
    progressMeta,
    error,
    resetError: resetErrorTrigger,
    shouldSuccess,
    onSubmit,
    onSubmitForm,
    onCreateSale,
  };
}
