import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PurchaseSuccess } from "./PurchaseSuccess";

export default {
  title: "Compound/Modals/PurchaseNft/PurchaseSuccess",
  component: PurchaseSuccess,
} as ComponentMeta<typeof PurchaseSuccess>;

const Template: ComponentStory<typeof PurchaseSuccess> = (args) => (
  <PurchaseSuccess {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "Morning",
  price: 5,
};
