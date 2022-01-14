import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PurchaseConfirm } from "./PurchaseConfirm";

export default {
  title: "Compound/Modals/PurchaseNft/PurchaseConfirm",
  component: PurchaseConfirm,
} as ComponentMeta<typeof PurchaseConfirm>;

const Template: ComponentStory<typeof PurchaseConfirm> = (args) => (
  <PurchaseConfirm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: "https://picsum.photos/id/1051/560/560",
  title: "Morning",
  artist: { avatarUrl: "https://bit.ly/dan-abramov", name: "Dan Abramov" },
  price: 1,
  dollarPrice: 200,
};
