import { RefObject, useCallback, useMemo } from "react";
import { MetadataJson, MetadataJsonCreator } from "@metaplex/js";
import debug from "debug";
import {
  attach,
  createEffect,
  createStore,
  forward,
  sample,
  StoreValue,
} from "effector";
import { useStore } from "effector-react";
import { reshape } from "patronum/reshape";
import { ENftProgress } from "sdk/createNft/mintArveaweNFT";
import { $connection } from "state/connection";
import { mintArweaveFx } from "state/nft";
import { createEntry } from "state/utils";
import { $user, $walletAddress } from "state/wallet";
import {
  createFilePack,
  getFilesCost,
  getMetadataCost,
  METADATA_FILE_NAME,
} from "utils/arweave-cost";
import { toNumber } from "utils/base";
import { createProgressTools } from "utils/createProgressTools";
import { throttle } from "utils/throttle";
import { getCreators } from "views/NftCreationView/components/NftCreate/helper";
import type { FormData } from "views/NftCreationView/components/NftCreate/NftCreationForm";

import { useToast } from "components/Modals/Toast";

import { AddressRow } from "./interface";
import { NftCreationSteps } from "./types";

const LOGErr = debug("error:NftCreationView.state");

export function createMetadataTools(WebFile = File) {
  const $metadataObject = createStore<MetadataJson | null>(null);
  const { set: updateMetadata, $node } = createEntry<Partial<FormData>>({});

  const { $maxSupply, $fileObject } = reshape({
    source: $node,
    shape: {
      $maxSupply: (data) => {
        return toNumber(data.supply ?? "0", 0);
      },
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
    $maxSupply,
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
    case ENftProgress.is_nft_created:
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

export function createPriceTools(
  {
    $fileObject,
    $metadataObject,
  }: Pick<
    ReturnType<typeof createMetadataTools>,
    "$metadataObject" | "$fileObject"
  >,
  WebFile = File
) {
  const { $node: $price, set: setPrice } = createEntry(0);

  const metadataCostFx = createEffect(
    (connection: StoreValue<typeof $connection>) => getMetadataCost(connection)
  );

  const updateCostFx = attach({
    effect: createEffect(
      async ({
        metadata,
        file,
        connection,
      }: {
        metadata: StoreValue<typeof $metadataObject>;
        file: StoreValue<typeof $fileObject>;
        connection: StoreValue<typeof $connection>;
      }) => {
        if (!metadata) {
          throw new Error("Missing metadata");
        }
        if (!file) {
          throw new Error("Missing file");
        }

        try {
          const deferMetadataCost = getFilesCost([
            file,
            createFilePack(metadata, METADATA_FILE_NAME, WebFile),
          ]);
          const [{ solana }, additionalSol] = await Promise.all([
            deferMetadataCost,
            metadataCostFx(connection),
          ]);
          const price = solana + additionalSol;
          return price;
        } catch (err) {
          LOGErr.log(err);
          throw err;
        }
      }
    ),
    source: {
      metadata: $metadataObject,
      file: $fileObject,
      connection: $connection,
    },
  });

  forward({
    from: updateCostFx.doneData,
    to: setPrice,
  });
  return { metadataCostFx, updateCostFx, $price };
}

export function createLocalState(WebFile = File) {
  const { $progress, $progressMeta } = createProgressTools(
    getContent,
    null as ENftProgress | null
  );

  const { updateMetadata, $metadataObject, $fileObject, $maxSupply } =
    createMetadataTools(WebFile);

  const { $price, updateCostFx } = createPriceTools(
    {
      $metadataObject,
      $fileObject,
    },
    WebFile
  );

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

      const response = await mintArweaveFx({
        file,
        metadata,
        maxSupply,
        primaryRoyalties,
        updateProgress: (state) => $progress.set(state),
      });
      $progress.set(null);
      return response.arweaveResult;
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

  forward({ from: submitMetadataFx.fail, to: $error });
  forward({ from: submitMetadataSourceFx.fail, to: $error });

  sample({
    clock: submitMetadataFx,
    fn({ data }) {
      return data;
    },
    target: updateMetadata,
  });

  const { $node: $formData, set: setFormData } =
    createEntry<Partial<FormData> | null>(null);

  return {
    $formData,
    setFormData,
    updateCostFx,
    fileObject: $fileObject,
    maxSupply: $maxSupply,
    error: $error,
    $progressMeta,
    $state,
    $price,
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
    maxSupply,
    $progressMeta,
    $state,
    $price,
    error,
    updateCost,
    $formData,
    setFormData,
  } = useMemo(() => {
    const ret = createLocalState();

    return {
      ...ret,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      updateCost: throttle<void>(() => ret.updateCostFx(), 3000),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formData = useStore($formData);
  const supply = useStore(maxSupply);
  const user = useStore($user);
  const continueToMint = useCallback(async () => {
    if (!formData) {
      throw new Error("Missing form data.");
    }
    if (!user) {
      toast({
        title: "Transaction Failed",
        text: "Your transaction failed because your wallet is not connected.",
        duration: 9000,
      });
      return;
    }
    await metadataObject.submit({
      data: formData as FormData,
      maxSupply: formData.supply ? parseInt(formData.supply) : 0,
    });
  }, [refForm, formData, user]);
  const toast = useToast();

  const embed = useCallback(() => {}, []);

  const step = useStore($state.$node);
  const metadata = useStore(metadataObject);
  const file = useStore(fileObject);
  const progressMeta = useStore($progressMeta);
  const price = useStore($price);

  return {
    file,
    error,
    metadata,
    progressMeta,
    continueToMint,
    formData,
    onUpdateForm(payload: Partial<FormData>) {
      metadataObject.update(payload);
      setFormData(payload);
      updateCost();
    },
    step,
    setStep: $state.set,
    embed,
    price,
    supply,
  };
}
