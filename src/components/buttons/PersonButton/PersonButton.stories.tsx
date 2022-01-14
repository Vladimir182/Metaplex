import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PersonButton } from ".";

export default {
  title: "Simple/InterfaceButtons/PersonButton",
  component: PersonButton,
} as ComponentMeta<typeof PersonButton>;

const Template: ComponentStory<typeof PersonButton> = (args) => (
  <PersonButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
  name: "Dan Abramov",
  avatarUrl: "https://bit.ly/dan-abramov",
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
  name: "Dan Abramov",
};

export const WithAddress = Template.bind({});
WithAddress.args = {
  address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
  avatarUrl: "https://bit.ly/code-beast",
};

export const WithoutImageWithAddress = Template.bind({});
WithoutImageWithAddress.args = {
  address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
};
