import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import {
  Edition,
  MasterEdition,
  Metadata,
  MetadataKey,
} from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";
import { ArtType, IArt } from "state/artworks/types";

export type ArtEditionProps = Pick<IArt, "type" | "prints">;

export const loadArtworkEdition = async ({
  connection,
  mint,
}: {
  connection: Connection;
  mint: AnyPublicKey;
}): Promise<ArtEditionProps> => {
  const edition = await Metadata.getEdition(connection, mint);

  return {
    type: getArtType(edition.data.key),
    prints: await getPrintNumbers(edition, connection),
  };
};

const getArtType = (editionKey?: number) => {
  switch (editionKey) {
    case MetadataKey.EditionV1:
      return ArtType.Print;
    case MetadataKey.MasterEditionV1:
    case MetadataKey.MasterEditionV2:
      return ArtType.Master;
    default:
      return ArtType.NFT;
  }
};

const getPrintNumbers = async (
  edition: Edition | MasterEdition,
  connection: Connection
) => {
  if (isEdition(edition)) {
    const masterEdition = await MasterEdition.load(
      connection,
      edition.data.parent
    );

    return {
      edition: edition.data.edition.toNumber(),
      ...getSupply(masterEdition),
    };
  }
  if (isMasterEdition(edition)) {
    return getSupply(edition);
  }
  return undefined;
};

const getSupply = (edition?: MasterEdition) => ({
  supply: edition?.data.supply.toNumber(),
  maxSupply: edition?.data.maxSupply?.toNumber(),
});

const isEdition = (value: Edition | MasterEdition): value is Edition => {
  return value.data.key === MetadataKey.EditionV1;
};

const isMasterEdition = (
  value: Edition | MasterEdition
): value is MasterEdition => {
  return (
    value.data.key === MetadataKey.MasterEditionV1 ||
    value.data.key === MetadataKey.MasterEditionV2
  );
};
