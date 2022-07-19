import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WalletAddress } from "./WalletAddress";

export default {
  title: "Forms/WalletAddress",
  component: WalletAddress,
} as ComponentMeta<typeof WalletAddress>;

const Template: ComponentStory<typeof WalletAddress> = (args) => (
  <WalletAddress
    {...args}
    address="EJsCWcjYKX8UVuKVznvpE6jSn6eVVvBWQ7EnyZGMFWPE"
  />
);

export const Default = Template.bind({});

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};

export const Owner = Template.bind({});
Owner.args = {
  isOwner: true,
  enableCopying: true,
};

export const NoCopyButton = Template.bind({});
NoCopyButton.args = {
  enableCopying: false,
};

export const NoAvatar = Template.bind({});
NoAvatar.args = {
  noAvatar: true,
};
