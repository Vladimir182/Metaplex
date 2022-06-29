import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SolUsd } from ".";

export default {
  title: "Data Display/SolUsd",
  component: SolUsd,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof SolUsd>;

const Template: ComponentStory<typeof SolUsd> = (args) => <SolUsd {...args} />;

export const Default = Template.bind({});
Default.args = {
  sol: 0.1,
};
