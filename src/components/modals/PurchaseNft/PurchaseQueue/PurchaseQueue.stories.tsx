import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PurchaseQueue } from ".";

export default {
  title: "Compound/Modals/PurchaseNft/PurchaseQueue",
  component: PurchaseQueue,
} as ComponentMeta<typeof PurchaseQueue>;

const Template: ComponentStory<typeof PurchaseQueue> = (args) => (
  <PurchaseQueue {...args} />
);

export const Default = Template.bind({});
Default.args = {};
