import { ArtworkStats } from "../shared";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { StackProps } from "@chakra-ui/layout";
import { TitledBlock } from "components/TitledBlock";

interface Props extends StackProps {
  date: string;
  editions: number | string;
  supplyType: string;
  sol?: number;
  usd?: number;
}

export const ArtworkInfo: React.FC<Props> = ({
  date,
  editions,
  supplyType,
  sol,
  usd,
  ...rest
}) => {
  const showStats = !sol;

  return showStats ? (
    <ArtworkStats
      date={date}
      editions={editions}
      supplyType={supplyType}
      h="56px"
      justifyContent="space-between"
      {...rest}
    />
  ) : (
    <TitledBlock title="Price" variant="xs" my={2}>
      <SolUsdDisplay sol={sol} usd={usd} />
    </TitledBlock>
  );
};
