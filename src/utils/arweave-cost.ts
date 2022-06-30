import { calculate } from "@metaplex/arweave-cost";
import {
  MAX_CREATOR_LEN,
  MAX_NAME_LENGTH,
  MAX_SYMBOL_LENGTH,
  MAX_URI_LENGTH,
} from "@metaplex-foundation/mpl-token-metadata";
import { MintLayout } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { MetadataJson } from "sdk/createNft";
export const METADATA_FILE_NAME = "metadata.json";

export function createFilePack(
  {
    attributes,
    name,
    symbol,
    description,
    seller_fee_basis_points,
    image,
    external_url,
    properties,
  }: MetadataJson,
  filename = METADATA_FILE_NAME,
  WebFile: typeof File = File
): File {
  const filedata = {
    animation_url: undefined,
    attributes: attributes?.length ? attributes : undefined,
    name,
    symbol,
    description,
    seller_fee_basis_points,
    image,
    external_url,
    properties: {
      ...properties,
      creators: properties.creators.map(({ address, share }) => ({
        address,
        share,
      })),
    },
  };
  return new WebFile([JSON.stringify(filedata)], filename);
}

export async function getFilesCost(files: File[]) {
  const sizes = files.map((file) => file.size);
  const cost = await calculate(sizes);
  return cost;
}

// code from  https://github.com/metaplex-foundation/metaplex/blob/master/js/packages/common/src/actions/metadata.ts#L23
export const MAX_CREATOR_LIMIT = 5;
export const MAX_METADATA_LEN =
  1 +
  32 +
  32 +
  MAX_NAME_LENGTH +
  MAX_SYMBOL_LENGTH +
  MAX_URI_LENGTH +
  MAX_CREATOR_LIMIT * MAX_CREATOR_LEN +
  2 +
  1 +
  1 +
  198;

export async function getMetadataCost(connection: Connection) {
  const [mintRent, metadataRent] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    connection.getMinimumBalanceForRentExemption(MintLayout.span),
    connection.getMinimumBalanceForRentExemption(MAX_METADATA_LEN),
  ]);
  return (metadataRent + mintRent) / LAMPORTS_PER_SOL;
}
