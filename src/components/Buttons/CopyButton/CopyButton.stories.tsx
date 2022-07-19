import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CopyButton } from "./CopyButton";

export default {
  title: "Buttons/CopyButton",
  component: CopyButton,
} as ComponentMeta<typeof CopyButton>;

const Template: ComponentStory<typeof CopyButton> = (args) => (
  <CopyButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "GnefZ1YCCFYnuU9xrizmyVpZxkaY8pDjpK5iWD1GF9KT",
};

export const Small = Template.bind({});
Small.args = {
  text: "GnefZ1YCCFYnuU9xrizmyVpZxkaY8pDjpK5iWD1GF9KT",
  size: "sm",
  fontSize: "sm",
};

export const WithEmptyAddress = Template.bind({});
WithEmptyAddress.args = {
  text: "",
};
