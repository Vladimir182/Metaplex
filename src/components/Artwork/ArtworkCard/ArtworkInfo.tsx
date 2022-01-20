import { ArtworkStats } from "../shared";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { StackProps } from "@chakra-ui/layout";
import { TitledBlock } from "components/TitledBlock";

interface Props extends StackProps {
  sol?: number;
  usd?: number;
}

export const ArtworkInfo: React.FC<Props> = ({ sol, usd, ...rest }) => {
  const showStats = !sol;

  return showStats ? (
    <ArtworkStats h="56px" justifyContent="space-between" {...rest} />
  ) : (
    <TitledBlock title="Price" variant="xs" my={2}>
      <SolUsdDisplay sol={sol} usd={usd} />
    </TitledBlock>
  );
};
