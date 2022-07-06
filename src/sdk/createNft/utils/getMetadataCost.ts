import { MintLayout } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";
import { lamportsToSol } from "utils/lamportsToSol";

// code from  https://github.com/metaplex-foundation/metaplex/blob/master/js/packages/common/src/actions/metadata.ts#L23
export const MAX_NAME_LENGTH = 32;
export const MAX_SYMBOL_LENGTH = 10;
export const MAX_URI_LENGTH = 200;
export const MAX_CREATOR_LEN = 32 + 1 + 1;
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
  return lamportsToSol(metadataRent + mintRent);
}
