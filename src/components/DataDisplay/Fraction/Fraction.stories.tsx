import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Fraction } from ".";

export default {
  title: "Data Display/Fraction",
  component: Fraction,
} as ComponentMeta<typeof Fraction>;

const Template: ComponentStory<typeof Fraction> = (args) => (
  <Fraction {...args} />
);

export const Default = Template.bind({});
Default.args = {
  current: 1,
  total: 25,
};

export const FractionChip = Template.bind({});
FractionChip.args = {
  current: 1,
  total: 25,
  variant: "chip",
};
