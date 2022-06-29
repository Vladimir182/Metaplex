import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DateTimePicker } from "./DateTimePicker";

export default {
  title: "Forms/DateTimePicker",
  component: DateTimePicker,
} as ComponentMeta<typeof DateTimePicker>;

const Template: ComponentStory<typeof DateTimePicker> = (args) => (
  <DateTimePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  minDate: new Date(),
};
