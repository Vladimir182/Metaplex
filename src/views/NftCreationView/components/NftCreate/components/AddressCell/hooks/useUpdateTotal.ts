import { useEffect } from "react";
import { AddressRow } from "views/NftCreationView";

import { useIsTotalActive } from "./useIsTotalActive";

interface UseUpdateTotalParams {
  secondaryRoyalties: Array<AddressRow>;
  royalty: string;
  id: number;
  onUpdate?: (
    id:
      | `secondaryRoyalties.${number}.total`
      | `secondaryRoyalties.${number}.share`,
    state: number
  ) => void;
}

export const useUpdateTotal = ({
  onUpdate,
  secondaryRoyalties,
  royalty,
  id,
}: UseUpdateTotalParams) => {
  const isTotalActive = useIsTotalActive(id);

  const percentOfTotal = Number(
    ((secondaryRoyalties[id]?.share * Number(royalty)) / 100).toFixed(2)
  );
  const percentage = Number(
    (((secondaryRoyalties[id]?.total || 0) * 100) / Number(royalty)).toFixed(2)
  );

  useEffect(() => {
    if (!onUpdate || !secondaryRoyalties[id]) {
      return;
    }

    if (!isTotalActive) {
      onUpdate(
        `secondaryRoyalties.${id}.total`,
        secondaryRoyalties[id]?.share && royalty ? percentOfTotal : 0
      );
    }

    if (royalty && isTotalActive) {
      onUpdate(
        `secondaryRoyalties.${id}.share`,
        secondaryRoyalties[id]?.total ? percentage : 0
      );
    }
  }, [
    royalty,
    onUpdate,
    id,
    secondaryRoyalties,
    isTotalActive,
    percentOfTotal,
    percentage,
  ]);
};
