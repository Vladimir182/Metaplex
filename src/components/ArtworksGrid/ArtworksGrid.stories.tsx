import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getArtworks } from "state/artworks/artworks.mock";
import { ArtworkGridCreateButton, ArtworksGrid } from ".";
import { AuctionState } from "@metaplex-foundation/mpl-auction";

export default {
  title: "Compound/ArtworksGrid",
  component: ArtworksGrid,
} as ComponentMeta<typeof ArtworksGrid>;

const Template: ComponentStory<typeof ArtworksGrid> = (args) => (
  <ArtworksGrid {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabs: [],
  items: { type: "artworks", value: getArtworks() },
  createButton: (
    <ArtworkGridCreateButton onClick={() => {}}>
      {" New Item"}
    </ArtworkGridCreateButton>
  ),
};

export const Listing = Template.bind({});
Listing.args = {
  tabs: [],
  variant: "buy",
  items: {
    type: "listing",
    value: getArtworks().map((artwork) => ({
      artwork: artwork,
      price: 1.2,
      refs: {
        acceptPayment: "",
        auction: "",
        authority: "",
        manager: "",
        vault: "",
      },
      status: AuctionState.Started,
    })),
  },
  createButton: (
    <ArtworkGridCreateButton onClick={() => {}}>
      {" New Item"}
    </ArtworkGridCreateButton>
  ),
};
