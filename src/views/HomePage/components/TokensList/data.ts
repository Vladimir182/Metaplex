import { ActionType } from "./state/store/progress";

export const MODAL_COPY: Record<
  ActionType,
  { title: string; subtitle: string }
> = {
  [ActionType.CloseMarket]: {
    title: "Remove token from the sale",
    subtitle:
      "After you approve the transaction with your wallet, the sale will be stopped.",
  },
  [ActionType.Withdraw]: {
    title: "Withdraw is in progress",
    subtitle:
      "After you approve the transaction with your wallet, SOL will be transferred to wallets.",
  },
  [ActionType.Claim]: {
    title: "Claiming token to wallet",
    subtitle:
      "After you approve the transaction with your wallet, NFT will be added to your wallet.",
  },
};
