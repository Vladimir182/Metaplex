import { NftCreationSteps } from "views/NftCreationView/types";

interface INftCreationHeaderText {
  label?: string;
  title?: string;
  subtitle?: string[];
}
export const getTextSelector = (
  step: NftCreationSteps
): INftCreationHeaderText => {
  switch (step) {
    case NftCreationSteps.PREVIEW:
      return {
        title: "Preview your Membership token",
      };
    default:
      return {};
  }
};
