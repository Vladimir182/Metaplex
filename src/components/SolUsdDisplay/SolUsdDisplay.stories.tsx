import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SolUsdDisplay } from ".";

export default {
  title: "Simple/SolUsdDisplay",
  component: SolUsdDisplay,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof SolUsdDisplay>;

const Template: ComponentStory<typeof SolUsdDisplay> = (args) => (
  <SolUsdDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sol: 0.1,
};
