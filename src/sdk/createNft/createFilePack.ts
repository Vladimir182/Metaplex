import { METADATA_FILE_NAME, MetadataJson } from "sdk/createNft";

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
