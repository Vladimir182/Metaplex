import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InstantBuy } from "./InstantBuy";

export default {
  title: "Compound/Modals/NftSale/InstantBuy",
  component: InstantBuy,
} as ComponentMeta<typeof InstantBuy>;

const Template: ComponentStory<typeof InstantBuy> = (args) => (
  <InstantBuy {...args} />
);

export const Default = Template.bind({});

Default.argTypes = { onSubmit: { action: "submited" } };
