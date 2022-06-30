import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";
import dayjs from "dayjs";

export const tokenVerification = async (
  connection: Connection,
  mint: AnyPublicKey
) => {
  let createdToken = null;
  let startDate = dayjs();
  while (!createdToken) {
    if (dayjs().diff(startDate) > 2000) {
      try {
        startDate = dayjs();
        createdToken = await Metadata.getEdition(connection, mint);
      } catch {}
    }
  }
};
