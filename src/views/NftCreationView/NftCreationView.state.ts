import { RefObject, useCallback, useMemo, useState } from "react";
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { useStore } from "effector-react";
import { useFileReader } from "hooks/useFileReader";
import { reshape } from "patronum/reshape";
import { ENftProgress, MetadataJson, MetadataJsonCreator } from "sdk/createNft";
import { fetchProfileArtworksFx, mintArweaveFx } from "state/artworks";
import { createEntry } from "state/utils";
import { $user, $walletAddress } from "state/wallet";
import { toNumber } from "utils/base";
import { createProgressTools } from "utils/createProgressTools";

import { useToast } from "components/Modals/Toast";

import { getCreators } from "./utils/getCreators";
import { AddressRow, FormData } from "./interface";
import { NftCreationSteps } from "./types";

export function createMetadataTools(WebFile = File) {
  const $metadataObject = createStore<MetadataJson | null>(null);
  const { set: updateMetadata, $node } = createEntry<Partial<FormData>>({});

  const { $fileObject } = reshape({
    source: $node,
    shape: {
      $fileObject: (data) => (data.file instanceof WebFile ? data.file : null),
    },
  });

  sample({
    clock: updateMetadata,
    source: {
      address: $walletAddress,
    },
    fn({ address }, data) {
      const creators: MetadataJsonCreator[] = getCreators(
        address,
        data.secondaryRoyalties
      );

      const metadata: MetadataJson = {
        name: data.title ?? "",
        symbol: "", // ???
        description: data.desc ?? "",
        seller_fee_basis_points: toNumber(data.royalty ?? "0") * 100,
        image: data.file?.name ?? "",
        attributes: data.attributes?.map(({ key, value }) => ({
          trait_type: key,
          value: value,
        })),
        external_url: "", // ???
        properties: {
          files: [
            {
              uri: data.file?.name ?? "",
              type: data.file?.type ?? "",
            },
          ],
          category: "image",
          creators,
        },
      };
      return metadata;
    },
    target: $metadataObject,
  });
  return {
    updateMetadata,
    $metadataObject,
    $fileObject,
  };
}

export function getContent(state: ENftProgress | null) {
  switch (state) {
    case ENftProgress.minting:
      return {
        title: "Creating",
        subtitle: "Starting Token Creation Process",
      };
    case ENftProgress.preparing_assets:
      return {
        title: "Preparing Assets",
        subtitle: "",
      };
    case ENftProgress.signing_metadata_transaction:
      return {
        title: "Signing Metadata Transaction",
        subtitle: "Approve the transaction from your wallet",
      };
    case ENftProgress.sending_transaction_to_solana:
      return {
        title: "Sending Transaction to Solana",
        subtitle: "This will take a few seconds",
      };
    case ENftProgress.waiting_for_initial_confirmation:
      return {
        title: "Waiting for Initial Confirmation",
        subtitle: "",
      };
    case ENftProgress.waiting_for_final_confirmation:
      return {
        title: "Waiting for Final Confirmation",
        subtitle: "",
      };
    case ENftProgress.uploading_to_arweave:
      return {
        title: "Uploading to Arweave",
        subtitle: "",
      };
    case ENftProgress.updating_metadata:
      return {
        title: "Updating Metadata",
        subtitle: "",
      };
    case ENftProgress.signing_token_transaction:
      return {
        title: "Signing Token Transaction",
        subtitle: "Approve the final transaction from your wallet",
      };
    case ENftProgress.loading_account:
      return {
        title: "Loading NFT you've just created",
        subtitle: "",
      };
    default:
      return {
        title: "",
        subtitle: "",
      };
  }
}

export function createLocalState(WebFile = File) {
  const { $progress, $progressMeta } = createProgressTools(
    getContent,
    null as ENftProgress | null
  );

  const { updateMetadata, $metadataObject, $fileObject } =
    createMetadataTools(WebFile);

  const $state = createEntry<NftCreationSteps>(NftCreationSteps.CREATE);

  const submitMetadataSourceFx = createEffect(
    async ({
      file,
      metadata,
      maxSupply,
      primaryRoyalties,
    }: {
      file: File | null;
      metadata: MetadataJson | null;
      maxSupply: number;
      primaryRoyalties: AddressRow[];
    }) => {
      if (!file) {
        throw new Error("Invalid file");
      }
      if (!metadata) {
        throw new Error("Invalid metadata");
      }
      let response;
      try {
        response = await mintArweaveFx({
          file,
          metadata,
          maxSupply,
          primaryRoyalties,
          updateProgress: (state) => $progress.set(state),
        });
        $state.set(NftCreationSteps.CONGRATULATION);
      } catch {
        $state.set(NftCreationSteps.PREVIEW);
      }
      $progress.set(null);
      return response;
    }
  );

  const submitMetadataFx = attach({
    effect: submitMetadataSourceFx,
    source: {
      metadata: $metadataObject,
    },
    mapParams(
      { data, maxSupply }: { data: FormData; maxSupply: number },
      { metadata }
    ) {
      return {
        file: data.file instanceof File ? data.file : null,
        metadata,
        maxSupply,
        primaryRoyalties: data.primaryRoyalties,
      };
    },
  });

  const $error = createStore<{
    error: Error;
  } | null>(null);

  forward({ from: mintArweaveFx.fail, to: $error });
  forward({ from: submitMetadataFx.fail, to: $error });
  forward({ from: submitMetadataSourceFx.fail, to: $error });
  $progressMeta.reset(submitMetadataSourceFx.fail);

  sample({
    clock: submitMetadataFx,
    fn({ data }) {
      return data;
    },
    target: updateMetadata,
  });

  return {
    fileObject: $fileObject,
    error: $error,
    $progressMeta,
    $progress,
    $state,
    metadataObject: {
      ...$metadataObject,
      update: updateMetadata,
      submit: submitMetadataFx,
    },
  };
}

export function useLocalState(refForm: RefObject<HTMLFormElement>) {
  const {
    metadataObject,
    fileObject,
    $progress,
    $progressMeta,
    $state,
    error,
  } = useMemo(() => {
    const ret = createLocalState();

    return {
      ...ret,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const progressStep = useStore($progress.$node);
  const user = useStore($user);
  const onCloseModal = createEvent();
  error.reset(onCloseModal);

  const [previewForm, setPreviewForm] = useState<FormData | null>(null);

  const onMint = useCallback(async () => {
    if (!previewForm) return;
    if (!user) {
      toast({
        title: "Transaction Failed",
        text: "Your transaction failed because your wallet is not connected.",
        duration: 9000,
      });
      return;
    }

    await metadataObject.submit({
      data: previewForm,
      maxSupply: previewForm.supply ? parseInt(previewForm.supply) : 0,
    });
    await fetchProfileArtworksFx();
  }, [previewForm, refForm, user]);

  const onFormSubmit = useCallback((formData: FormData) => {
    setPreviewForm({
      ...formData,
    });
    $state.set(NftCreationSteps.PREVIEW);
  }, []);
  const toast = useToast();

  const step = useStore($state.$node);
  const file = useStore(fileObject);
  const [contentUrl] = useFileReader(file);
  const progressMeta = useStore($progressMeta);

  return {
    file,
    contentUrl,
    error,
    onCloseModal,
    progressMeta,
    onMint,
    onFormSubmit,
    previewForm,
    step,
    progressStep,
    setStep: $state.set,
  };
}
