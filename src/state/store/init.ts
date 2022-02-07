import { NAME_MAX_LEN } from "@metaplex-foundation/mpl-fixed-price-sale";
import { attach, createEffect, StoreValue } from "effector";
import { initStore } from "sdk/createStore/initStore";
import { $connection } from "state/connection";
import { $wallet } from "state/wallet";
import { ETransactionProgress } from "enums/transactionProgress";

export interface IParams {
  name: string;
  updateProgress: (status: ETransactionProgress | null) => void;
}

export interface ISource {
  connection: StoreValue<typeof $connection>;
  wallet: StoreValue<typeof $wallet>;
}

export type IParamsWithSource = IParams & ISource;

// Since transaction requires name to be fixed length add spaces on the end
const prepareName = (name: string) => {
  let result = name;
  const bytesLength = Buffer.from(result, "utf8").byteLength;

  if (bytesLength < NAME_MAX_LEN) {
    result += " ".repeat(NAME_MAX_LEN - bytesLength);
  }

  return result;
};

export const initStoreFx = attach({
  effect: createEffect(
    async ({ name, updateProgress, connection, wallet }: IParamsWithSource) => {
      if (!wallet) {
        throw new Error("Wallet wasn't connected");
      }

      const store = await initStore({
        name: prepareName(name),
        connection,
        wallet,
        updateProgress,
      });

      return store;
    }
  ),
  source: {
    connection: $connection,
    wallet: $wallet,
  },
  mapParams: (params: IParams, sources) => ({
    ...sources,
    ...params,
  }),
});
