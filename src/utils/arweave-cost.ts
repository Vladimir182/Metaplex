import { calculate } from "@metaplex/arweave-cost";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Connection, MetadataJson } from "@metaplex/js";
import { MintLayout } from "@solana/spl-token";
import {
  MAX_CREATOR_LEN,
  MAX_NAME_LENGTH,
  MAX_SYMBOL_LENGTH,
  MAX_URI_LENGTH,
} from "@metaplex-foundation/mpl-token-metadata";
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

export type InfoCalculate = ReturnType<typeof calculate> extends PromiseLike<
  infer T
>
  ? T
  : never;

export function getAssetCostInfo(
  files: Map<string, Buffer>
): Promise<InfoCalculate> {
  const sizes = Array.from(files.values()).map((f) => f.byteLength);
  return calculate(sizes);
}

export interface GetArweaveCostInfoResult {
  info: InfoCalculate;
  lamports: number;
}

export async function getFilesCostInfo(
  aFiles: File[]
): Promise<GetArweaveCostInfoResult> {
  const dataList = await Promise.all(
    aFiles.map((file) =>
      file.arrayBuffer().then((d) => [file.name, Buffer.from(d)] as const)
    )
  );
  const files = new Map<string, Buffer>(dataList);
  const info = await getAssetCostInfo(files);
  return { info, lamports: info.solana * LAMPORTS_PER_SOL };
}

export async function getFileAndMetadataCostInfo(
  file: File,
  metadata: MetadataJson,
  fileMetadata: File = createFilePack(metadata)
) {
  return getFilesCostInfo([file, fileMetadata]);
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
