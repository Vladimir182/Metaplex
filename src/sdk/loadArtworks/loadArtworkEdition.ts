import {
  Edition,
  Key,
  MasterEditionV1,
  MasterEditionV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import { loadAccountAndDeserialize } from "sdk/share";
import { ArtType, IArt } from "state/artworks/types";
import { parseBN } from "utils/parseBN";

import { findEditionAddress } from "./utils";

export type ArtEditionProps = Pick<IArt, "type" | "prints">;
export type AnyEdition = Edition | MasterEditionV1 | MasterEditionV2;

export const loadArtworkEdition = async ({
  connection,
  mint,
}: {
  connection: Connection;
  mint: PublicKey;
}): Promise<ArtEditionProps> => {
  try {
    const [editionPda] = await findEditionAddress(mint);
    const edition = await loadAccountAndDeserialize(
      connection,
      AnyEditionDeserializer,
      editionPda
    );
    const master = isEdition(edition)
      ? await loadAccountAndDeserialize(
          connection,
          AnyEditionDeserializer,
          edition.parent
        )
      : undefined;

    return getEditionProps(edition, master);
  } catch (e) {
    // This is still an NFT but not on Metaplex standard, or a semi-fungible token
    return getEditionProps();
  }
};

export const getEditionProps = (edition?: AnyEdition, master?: AnyEdition) => ({
  type: getArtType(edition),
  prints: getPrintNumbers(edition, master),
});

const getArtType = (edition?: AnyEdition) => {
  switch (edition?.key) {
    case Key.EditionV1:
      return ArtType.Print;
    case Key.MasterEditionV1:
    case Key.MasterEditionV2:
      return ArtType.Master;
    default:
      return ArtType.NFT;
  }
};

const getPrintNumbers = (edition?: AnyEdition, master?: AnyEdition) => {
  if (!edition) return undefined;
  if (isEdition(edition))
    return { edition: parseBN(edition.edition), ...getSupply(master) };
  return getSupply(edition);
};

const getSupply = (edition?: AnyEdition) => {
  if (!edition || isEdition(edition)) return undefined;
  return {
    supply: parseBN(edition.supply),
    maxSupply: parseBN(edition.maxSupply),
  };
};

export const isEdition = (value: AnyEdition): value is Edition => {
  return value.key === Key.EditionV1;
};

export class AnyEditionDeserializer {
  static deserialize(buf: Buffer, offset?: number): [AnyEdition, number] {
    const key = buf[0];
    switch (key) {
      case Key.EditionV1:
        return Edition.deserialize(buf, offset);
      case Key.MasterEditionV1:
        return MasterEditionV1.deserialize(buf, offset);
      case Key.MasterEditionV2:
        return MasterEditionV2.deserialize(buf, offset);
      default:
        throw Error(`Unknown Edition key`);
    }
  }
}
