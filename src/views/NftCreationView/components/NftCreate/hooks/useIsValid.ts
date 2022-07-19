import { UseFormReturn } from "react-hook-form";
import { useStore } from "effector-react";
import { FormData } from "views/NftCreationView";

import { $errorsStore, calcAllErrors } from "../utils";

interface UseIsValidParams {
  methods: UseFormReturn<FormData>;
}

export const useIsValid = ({ methods }: UseIsValidParams) => {
  const errorsData = useStore($errorsStore);

  const { formState } = methods;

  const primary = methods.getValues("primaryRoyalties");
  const secondary = methods.getValues("secondaryRoyalties");
  const primaryErrors = calcAllErrors(primary);
  const secondaryErrors = calcAllErrors(secondary);

  const hasErrors =
    primaryErrors?.isAnyErrors ||
    secondaryErrors?.isAnyErrors ||
    errorsData?.isAnyErrors ||
    Object.values(formState.errors).length;

  return !hasErrors;
};
