import { StoreValue } from "effector";
import { bignum, COption } from "@metaplex-foundation/beet";

import { $connection } from "state/connection";
import { IArt } from "state/artworks";
import { $store } from "state/store";
import { $wallet } from "state/wallet";
import { ETransactionProgress } from "enums/transactionProgress";

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

export interface MarketSettings {
  name: string;
  description: string;
  mutable: boolean;
  price: bignum;
  piecesInOneWallet: COption<bignum>;
  startDate: bignum;
  endDate: COption<bignum>;
  maxSupply: COption<bignum>;
}
