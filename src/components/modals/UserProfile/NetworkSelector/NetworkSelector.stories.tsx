import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NETWORK_LIST } from "state/connection";

import { NetworkSelector } from ".";
export default {
  title: "Simple/NetworkSelector",
  component: NetworkSelector,
} as ComponentMeta<typeof NetworkSelector>;

const Template: ComponentStory<typeof NetworkSelector> = (args) => (
  <NetworkSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  networks: NETWORK_LIST,
  currentNetwork: "devnet",
  setNetwork: () => {},
};
