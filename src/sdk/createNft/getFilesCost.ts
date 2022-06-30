import { calculate } from "@metaplex/arweave-cost";

export async function getFilesCost(files: File[]) {
  const sizes = files.map((file) => file.size);
  const cost = await calculate(sizes);
  return cost;
}
