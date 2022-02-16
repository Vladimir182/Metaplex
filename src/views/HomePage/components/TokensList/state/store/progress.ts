import { createEntry } from "state/utils";

export enum ActionType {
  CloseMarket,
  Withdraw,
  Claim,
}

export const $progress = createEntry<{
  type?: ActionType;
  isVisible: boolean;
  claimedImg?: string;
}>({
  isVisible: false,
});
