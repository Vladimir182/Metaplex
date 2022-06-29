import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArtworkSummary } from "./ArtworkSummary";

export default {
  title: "Data Display/ArtworkSummary",
  component: ArtworkSummary,
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#121212" }],
    },
  },
} as ComponentMeta<typeof ArtworkSummary>;

const Template: ComponentStory<typeof ArtworkSummary> = (args) => (
  <ArtworkSummary {...args} />
);

export const Default = Template.bind({});
Default.args = {
  img: "https://picsum.photos/id/1051/560/560",
  title: "Morning",
  artist: "Michelle Greene",
  edition: 1,
  total: 20,
};
