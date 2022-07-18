import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Stepper } from ".";

export default {
  title: "Simple/Stepper",
  component: Stepper,
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => (
  <Stepper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  labels: ["Select item", "details", "mint"],
};

export const SecondStepActive = Template.bind({});
SecondStepActive.args = {
  labels: ["Select item", "details", "mint"],
  activeStep: 1,
};
