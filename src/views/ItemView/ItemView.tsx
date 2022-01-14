import { Stack, StackDivider } from "@chakra-ui/layout";

import { ArtImage } from "components/ArtPreview";
import { DescriptionColumn } from "./DescriptionColumn";
import { Layout } from "components/Layout";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useParams } from "react-router-dom";
import { ReactNode } from "react";
import { useLocalState } from "./ItemView.state";
import type { IArt } from "state/artworks";
import { ItemViewSale } from "./ItemViewSale";
import { useStore } from "effector-react/effector-react.cjs";
import { $user } from "../../state/wallet";
import { useDisclosure } from "@chakra-ui/react";
import { ListForSaleDialog } from "components/ListForSaleDialog";

export const ItemView: React.FC<{
  notFound?: ReactNode;
  defaultArtwork?: IArt;
  variant: "sell" | "buy";
}> = ({ defaultArtwork, notFound, variant = "sell" }) => {
  const user = useStore($user);
  const { mdUp } = useCustomBreakpoints();
  const { itemId } = useParams();
  const { artwork, onSubmitInstantSale } = useLocalState(
    itemId,
    defaultArtwork
  );
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!artwork) {
    return <>{notFound}</>;
  }

  return (
    <Layout>
      <Stack
        direction={mdUp ? "row" : "column"}
        spacing={4}
        divider={
          mdUp ? <StackDivider borderColor="whiteAlpha.100" /> : undefined
        }
        maxH={mdUp ? "calc(100vh - 64px)" : "unset"}
        width="100%"
      >
        {!mdUp && variant === "sell" && (
          <ItemViewSale address={user?.address} onClick={onOpen} />
        )}
        <ArtImage uri={artwork.image} />
        <DescriptionColumn
          variant={variant}
          title={artwork.title}
          details={artwork.details}
          artists={artwork.artists}
          tags={artwork.tags}
          stats={artwork.stats}
          walletTransaction={artwork.walletTransaction}
        >
          {variant === "sell" && mdUp && (
            <ItemViewSale address={user?.address} onClick={onOpen} />
          )}
        </DescriptionColumn>
      </Stack>

      <ListForSaleDialog
        isVisible={isOpen}
        hideModal={onClose}
        artworkSummary={{
          img: artwork.image ?? "",
          title: artwork.title ?? "",
          artist: artwork.artists.join(" "),
          edition: "",
          total: artwork.prints?.supply ?? 0,
        }}
        onSubmit={onSubmitInstantSale}
      />
    </Layout>
  );
};
