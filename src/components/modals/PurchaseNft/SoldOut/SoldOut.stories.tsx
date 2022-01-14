import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SoldOut } from ".";

export default {
  title: "Compound/Modals/PurchaseNft/SoldOut",
  component: SoldOut,
} as ComponentMeta<typeof SoldOut>;

const Template: ComponentStory<typeof SoldOut> = (args) => (
  <SoldOut {...args} />
);

export const Default = Template.bind({});
Default.args = {};
