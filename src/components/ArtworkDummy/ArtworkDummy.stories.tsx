import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArtworkDummy } from ".";

export default {
  title: "Compound/ArtworkDummy",
  component: ArtworkDummy,
} as ComponentMeta<typeof ArtworkDummy>;

const Template: ComponentStory<typeof ArtworkDummy> = (args) => (
  <ArtworkDummy {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Create a new Item",
  bodyText:
    "Your items listed for sale will appear here, create your first one!",
};
