import { AddressRow } from "views/NftCreationView";

export const calcProportionsSum = (
  array: Array<AddressRow>,
  id?: number
): number =>
  array
    .map((i: AddressRow, idx: number) => (id !== idx ? i.share : 0))
    .reduce((a: number, c: number) => a + c, 0);
