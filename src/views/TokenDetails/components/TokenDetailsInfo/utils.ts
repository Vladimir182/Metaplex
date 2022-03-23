import { useStore } from "effector-react";
import { $network } from "state/connection";

export const getShortAddress = (str: string) =>
  str.substring(0, 4) + "..." + str.substring(str.length - 4);

export const getSolExplorerLink = (address: string): string => {
  const network = useStore($network);
  let link = `https://explorer.solana.com/address/${address}`;
  if (network === "devnet") {
    link += "?cluster=devnet";
  }

  if (network === "testnet") {
    link += "?cluster=testnet";
  }

  return link;
};
