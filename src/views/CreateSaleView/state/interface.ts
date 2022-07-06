import { StoreValue } from "effector";
import { ETransactionProgress } from "enums/transactionProgress";
import { IArt } from "state/artworks";
import { $connection } from "state/connection";
import { $store } from "state/store";
import { $wallet } from "state/wallet";

import { FormState } from "../components/Form";

export interface Source {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
  store: StoreValue<typeof $store>;
}

export interface Params {
  updateProgress: (status: ETransactionProgress | null) => void;
  artwork: IArt;
  saleDetails: FormState;
}
