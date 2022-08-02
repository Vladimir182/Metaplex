import { ETransactionProgress } from "enums/transactionProgress";

export const getContent = (state: ETransactionProgress | null) => {
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
    case ETransactionProgress.loading_store:
      return {
        title: "Loading Store",
        subtitle: "",
      };
    default:
      return {
        title: "",
        subtitle: "",
      };
  }
};
