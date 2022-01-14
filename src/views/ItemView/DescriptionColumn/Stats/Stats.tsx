import { HStack } from "@chakra-ui/layout";
import { Fraction } from "components/Fraction";
import { TitledBlock } from "components/TitledBlock";

interface StatsProps {
  edition: number | string;
  available: number | string;
  total: number | string;
}

export const Stats: React.FC<StatsProps> = ({ edition, available, total }) => {
  return (
    <HStack spacing={12}>
      <TitledBlock title="Edition">
        <Fraction current={edition} total={total}></Fraction>
      </TitledBlock>
      <TitledBlock title="Available">
        <Fraction current={available} total={total}></Fraction>
      </TitledBlock>
    </HStack>
  );
};
