export enum ETransactionProgress {
  creating_transaction,
  signing_transaction,
  sending_transaction_to_solana,
  waiting_for_final_confirmation,
  loading_store,
}
