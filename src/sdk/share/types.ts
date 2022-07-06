import { RawAccount } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export interface Deserializable<T> {
  deserialize(buf: Buffer, offset?: number): [T, number];
}

export interface Decodable<T> {
  decode(b: Buffer, offset?: number): T;
}

export type TokenAccount = Pick<RawAccount, "mint" | "owner" | "amount"> & {
  address: PublicKey;
};
