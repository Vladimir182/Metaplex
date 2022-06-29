import { useEffect } from "react";
import { MetadataJsonCreator } from "@metaplex/js";
import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { PublicKey } from "@solana/web3.js";
import { createEvent, restore } from "effector";
import { AddressRow } from "views/NftCreationView";

export const getCreators = (
  wallet?: StringPublicKey | null,
  secondaryRoyalties?: AddressRow[]
): MetadataJsonCreator[] => {
  const storeOwner = !!wallet
    ? [
        {
          address: wallet,
          verified: true,
          share: 100,
        },
      ]
    : [];

  const hasOwnerInList = secondaryRoyalties?.some(
    ({ address }) => address === wallet
  );

  if (!secondaryRoyalties) {
    return storeOwner;
  }

  const [{ address }] = secondaryRoyalties;

  if (!address) {
    return storeOwner;
  }

  return [
    ...secondaryRoyalties.map((royalties) => ({
      ...royalties,
      share: Number(royalties.share),
    })),
    ...(!hasOwnerInList ? [{ ...storeOwner[0], share: 0 }] : []),
  ];
};

export const calcProportionsSum = (
  array: Array<AddressRow>,
  id?: number
): number =>
  array
    .map((i: AddressRow, idx: number) => (id !== idx ? Number(i.share) : 0))
    .reduce((a: number, c: number) => a + c, 0);

export const calcError = (array: Array<AddressRow>): boolean => {
  const sum = array.reduce(
    (a: number, { share }: AddressRow) => Number(share) + a,
    0
  );

  return sum < 100;
};

export const useUpdateCalculationsOnSecondary = (
  onUpdate: ((id: number, state: AddressRow) => void) | undefined,
  secondaryRoyalties: Array<AddressRow>,
  royalty: string,
  id: number
) => {
  const totalInput = document.getElementsByName(
    `secondaryRoyalties.${id}.total`
  )[0];
  const isTotalActive = document.activeElement === totalInput;

  const newTotal = (
    Number(secondaryRoyalties[id]?.share) *
    Number(royalty) *
    0.01
  ).toFixed(2);

  const newProportion = (
    ((Number(secondaryRoyalties[id]?.total) || 0) * 100) /
    Number(royalty)
  ).toFixed(2);

  useEffect(() => {
    if (onUpdate && !isTotalActive) {
      onUpdate(id, {
        ...secondaryRoyalties[id],
        total: !!secondaryRoyalties[id]?.share && !!royalty ? newTotal : "",
      });
    }
  }, [secondaryRoyalties[id]?.share, royalty, isTotalActive]);

  useEffect(() => {
    if (onUpdate && isTotalActive) {
      onUpdate(id, {
        ...secondaryRoyalties[id],
        share: !!secondaryRoyalties[id]?.total ? newProportion : "0",
      });
    }
  }, [secondaryRoyalties[id]?.total, royalty, isTotalActive]);
};

export const isAddressRow = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array?: Array<any>
): array is Array<AddressRow> => {
  if (!array) return false;
  return !array.filter(
    ({ address, verified, share }) =>
      typeof address === "undefined" &&
      typeof verified === "undefined" &&
      typeof share === "undefined"
  ).length;
};
interface ErrorResult {
  isSumError: boolean;
  isEmptyAddress: boolean;
  isCorrectSum: boolean;
  errorMessage: string;
}

export const setErrors = createEvent<ErrorResult>();
export const $errorsStore = restore(setErrors, null);

export const calcAllErrors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any[],
  id?: number
):
  | {
      isSumError: boolean;
      isEmptyAddress: boolean;
      isCorrectSum: boolean;
      errorMessage: string;
    }
  | undefined => {
  if (!isAddressRow(control)) return;
  const isIdExist = typeof id === "number";
  const isSumError = calcError(control);
  const isEmptyAddress = isIdExist
    ? !control[id].address && !!control[id].share
    : !!control.filter(({ address }) => !address).length;
  const isLastItem = id === control.length - 1;
  const isCorrectSum =
    !isSumError &&
    !!control[0].share &&
    control[control.length - 1].share == "0";

  let errorMessage = "";
  if (isLastItem || !isIdExist) {
    if (isSumError) {
      errorMessage =
        "Part of the royalties remained undivided. You must distribute all 100%";
    }
    if (isCorrectSum) errorMessage = "Free up some royalties in other wallets";
  }

  if (isIdExist && !!control[id].address) {
    try {
      const pubKey = new PublicKey(control[id].address)?.toBytes();
      if (!PublicKey.isOnCurve(pubKey)) errorMessage = "Address is not valid";
    } catch (error) {
      errorMessage = "Address is not valid";
    }
  }

  if (isEmptyAddress) {
    errorMessage = "Required field not filled";
  }

  setErrors({ isEmptyAddress, isSumError, isCorrectSum, errorMessage });

  return {
    isEmptyAddress,
    isSumError,
    isCorrectSum,
    errorMessage,
  };
};
