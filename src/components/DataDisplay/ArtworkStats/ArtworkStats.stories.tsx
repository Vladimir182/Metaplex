import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArtworkStats } from "./ArtworkStats";

export default {
  title: "Data Display/ArtworkStats",
  component: ArtworkStats,
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#121212" }],
    },
  },
} as ComponentMeta<typeof ArtworkStats>;

const Template: ComponentStory<typeof ArtworkStats> = (args) => (
  <ArtworkStats {...args} />
);

export const Default = Template.bind({});
Default.args = {
  supply: 1,
  maxSupply: 20,
};
