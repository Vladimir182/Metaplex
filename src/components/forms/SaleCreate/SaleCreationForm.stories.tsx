import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SaleCreationForm } from "./SaleCreationForm";

export default {
  title: "Compound/Forms/SaleCreationForm",
  component: SaleCreationForm,
} as ComponentMeta<typeof SaleCreationForm>;

const Template: ComponentStory<typeof SaleCreationForm> = (args) => (
  <SaleCreationForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
