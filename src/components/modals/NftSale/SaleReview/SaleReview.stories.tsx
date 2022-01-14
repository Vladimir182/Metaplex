import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SaleReview } from ".";

export default {
  title: "Compound/Modals/NftSale/SaleReview",
  component: SaleReview,
} as ComponentMeta<typeof SaleReview>;

const Template: ComponentStory<typeof SaleReview> = (args) => (
  <SaleReview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  artworkSummary: {
    img: "https://picsum.photos/id/1051/560/560",
    title: "Morning",
    artist: "Michelle Greene",
    edition: 1,
    total: 20,
  },
  priceProps: { sol: 300, usd: 9000 },
  endDate: "12/18/2021 12:00",
};
