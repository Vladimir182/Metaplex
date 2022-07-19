import { useMemo } from "react";
import { truncateInMiddle } from "utils/truncateInMiddle";

export const useShortAddress = (address: string, length?: number) => {
  return useMemo(() => truncateInMiddle(address, length), [address, length]);
};
