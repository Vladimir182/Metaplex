import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Navbar } from ".";
import { NavbarActions } from "./NavbarActions";
import { WalletProvider } from "contexts";

export default {
  title: "Compound/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof NavbarActions> = ({ user }) => (
  <Navbar>
    <NavbarActions user={user} onToggleSidebar={() => {}} />
  </Navbar>
);

export const Default = Template.bind({});
Default.args = {};

export const WithUser = Template.bind({});
WithUser.args = {
  user: { address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq" },
};

export const WithUserAvatar = Template.bind({});
WithUserAvatar.args = {
  user: {
    address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
    avatarUrl: "https://bit.ly/code-beast",
  },
};

export const WithUserName = Template.bind({});
WithUserName.args = {
  user: {
    address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
    name: "Some User with Long name",
    avatarUrl: "https://bit.ly/code-beast",
  },
};

export const WithNotifications = Template.bind({});
WithNotifications.args = {
  user: {
    address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
    name: "Some User with Long name",
    avatarUrl: "https://bit.ly/code-beast",
    notifications: 2,
  },
};
