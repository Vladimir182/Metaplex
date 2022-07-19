import { PublicKey } from "@solana/web3.js";
import { createEvent, restore } from "effector";
import { useStore } from "effector-react";
import { $user } from "state/wallet";
import { AddressRow } from "views/NftCreationView";

export const calcError = (array: Array<AddressRow>): boolean => {
  const sum = array.reduce(
    (a: number, { share }: AddressRow) => Number(share) + a,
    0
  );

  return sum < 100;
};

export const isAddressRow = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array?: Array<any>
): array is Array<AddressRow> => {
  if (!array) return false;
  return !array.filter(
    ({ key, value, total, isOwner }) =>
      typeof key === "undefined" &&
      typeof value === "undefined" &&
      typeof total === "undefined" &&
      typeof isOwner === "undefined"
  ).length;
};

interface ErrorResult {
  isNotUniqueAddresses?: boolean;
  isSumError?: boolean;
  isEmptyAddress?: boolean;
  isCorrectSum?: boolean;
  errorMessage?: string;
  isAnyErrors?: boolean;
}

export const setErrors = createEvent<ErrorResult>();
export const $errorsStore = restore(setErrors, null);

export const isWalletValid = (wallet: string) => {
  try {
    const pubKey = new PublicKey(wallet)?.toBytes();
    return PublicKey.isOnCurve(pubKey);
  } catch (error) {
    return false;
  }
};

export const calcAllErrors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any[],
  id?: number
): ErrorResult | undefined => {
  // todo: update me
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useStore($user);
  if (!isAddressRow(control)) return;

  const isInitValue =
    (control.length === 1 &&
      control[0]?.address === user?.address &&
      control[0]?.share === 100) ||
    !control.length;
  if (isInitValue) return;

  const isIdExist = typeof id === "number";

  const isSumError = calcError(control);

  const isEmptyAddress = isIdExist
    ? !control[id].address && !!control[id].share
    : !!control.filter(({ address }) => !address).length;

  const isCorrectSum =
    !isSumError &&
    !!control[0].share &&
    control[control.length - 1].share === 0;

  let errorMessage = "";
  if (isSumError) {
    errorMessage =
      "Part of the royalties remained undivided. You must distribute all 100%";
  }
  if (isCorrectSum) errorMessage = "Free up some royalties in other wallets";

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

  let isNotUniqueAddresses = false;
  const addresses = control.map(({ address }) => address);
  if (new Set(addresses).size !== addresses.length) {
    isNotUniqueAddresses = true;
    const values: string[] = [];
    const indexes: number[] = [];
    for (let i = 0; i < addresses.length; i++) {
      if (values.includes(addresses[i])) indexes.push(i);
      else values.push(addresses[i]);
    }
    if (id && indexes.includes(id)) {
      errorMessage = "Creator wallet should be unique";
    }
  }

  const isAnyErrors =
    isNotUniqueAddresses ||
    isEmptyAddress ||
    isSumError ||
    isCorrectSum ||
    !!errorMessage;

  return {
    isNotUniqueAddresses,
    isEmptyAddress,
    isSumError,
    isCorrectSum,
    errorMessage,
    isAnyErrors,
  };
};
