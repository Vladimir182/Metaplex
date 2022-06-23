import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateSaleView } from "./CreateSaleView";
export default {
  title: "Views/CreateSaleView",
  component: CreateSaleView,
} as ComponentMeta<typeof CreateSaleView>;

const Template: ComponentStory<typeof CreateSaleView> = (args) => (
  <CreateSaleView {...args} />
);

export const Default = Template.bind({});
Default.parameters = { layout: "fullscreen" };
