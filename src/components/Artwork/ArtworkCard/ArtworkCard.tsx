import { Box } from "@chakra-ui/react";
import { customSize } from "global-const/customSize";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useCallback, useState } from "react";
import { artHelpers, ArtworkCardVariant, IArt } from "state/artworks";
import { truncateInMiddle } from "utils/truncateInMiddle";
import { useSolToUsd } from "state/react/useCurrency";
import { ArtworkCardButtons } from "./ArtworkCardButtons";
import { ArtworkCardHeader } from "./ArtworkCardHeader";
import { ArtworkImage } from "./ArtworkImage";
import { ArtworkInfo } from "./ArtworkInfo";
import { ArtworkSubtitle } from "./ArtworkSubtitle";
import { ArtworkTitle } from "./ArtworkTitle";

interface Props {
  artwork: IArt;
  variant?: ArtworkCardVariant;
  onNewEdition?: (artwork: IArt) => void;
  onSell?: (artwork: IArt) => void;
}

export const ArtworkCard: React.FC<Props> = ({
  artwork,
  variant,
  ...props
}) => {
  const { smUp } = useCustomBreakpoints();
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded(true);
  const handleCollapse = () => setExpanded(false);

  const isSeller = variant === "sell";

  const boxProps = smUp
    ? {
        maxWidth: customSize.artwork.card.width,
        height: isSeller ? 517 : 519,
        overflow: "hidden",
        onMouseEnter: handleExpand,
        onMouseLeave: handleCollapse,
      }
    : { maxWidth: "100%" };
  const { image, title } = artwork;
  const authorName = artHelpers.getAuthorName(artwork);
  const authorImg = artHelpers.getAuthorImg(artwork);
  const sol = artHelpers.getPrice(artwork);
  const type = artwork.type;
  const { convert } = useSolToUsd();
  const priceUSD = convert(sol);

  const onNewEdition = useCallback(() => {
    props.onNewEdition?.(artwork);
  }, [props.onNewEdition, artwork]);
  const onSell = useCallback(() => {
    props.onSell?.(artwork);
  }, [props.onSell, artwork]);

  return (
    <Box borderRadius="xl" bg="gray.800" {...boxProps}>
      <Box borderRadius="xl" bg="whiteAlpha.50" p={4}>
        <ArtworkCardHeader
          name={truncateInMiddle(authorName, 5)}
          img={authorImg}
          mb={5}
        />
        <ArtworkImage imgUrl={image} expanded={expanded} smUp={smUp} />
        <ArtworkTitle title={title} mt={5} />
        <ArtworkSubtitle type={type} expanded={expanded} smUp={smUp} />
      </Box>
      <Box p={4} pt={2} pb={2}>
        <ArtworkInfo sol={sol ?? 0} usd={priceUSD ?? 0} mb={2} />
        <ArtworkCardButtons
          primaryAction={onSell}
          secondaryAction={onNewEdition}
          expanded={expanded}
          smUp={smUp}
        />
      </Box>
    </Box>
  );
};
