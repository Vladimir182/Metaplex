import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateButton } from ".";

export default {
  title: "Simple/InterfaceButtons/CreateButton",
  component: CreateButton,
} as ComponentMeta<typeof CreateButton>;

const Template: ComponentStory<typeof CreateButton> = () => (
  <CreateButton>New Item</CreateButton>
);

export const Default = Template.bind({});
Default.args = {};
