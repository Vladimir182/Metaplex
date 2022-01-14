import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FileInput } from ".";

export default {
  title: "Simple/FileInput",
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actionText: "Submit",
};
