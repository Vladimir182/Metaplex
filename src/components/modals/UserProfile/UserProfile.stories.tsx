import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserProfile } from ".";
import { action } from "@storybook/addon-actions";
import { NETWORK_LIST } from "state/connection";
export default {
  title: "Compound/Modals/UserProfile",
  component: UserProfile,
} as ComponentMeta<typeof UserProfile>;

const Template: ComponentStory<typeof UserProfile> = (args) => (
  <UserProfile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: {
    address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
    avatarUrl: "https://bit.ly/code-beast",
  },
  balance: { sol: 10.25, usd: 1210.45 },
  networks: NETWORK_LIST,
  currentNetwork: "devnet",
  setNetwork: action("Set network"),
  forceOpen: true,
};
