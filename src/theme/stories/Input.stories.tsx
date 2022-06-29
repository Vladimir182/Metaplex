import { Input } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI kit/Input",
  component: Input,
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
    },
    isInvalid: { type: "boolean" },
    isDisabled: { type: "boolean" },
    isReadOnly: { type: "boolean" },
    placeholder: { type: "string" },
    defaultValue: { type: "string" },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputEmpty = Template.bind({});
InputEmpty.args = {};

export const InputEmptyPlaceholder = Template.bind({});
InputEmptyPlaceholder.args = {
  placeholder: "Input",
};

export const InputWithText = Template.bind({});
InputWithText.args = {
  defaultValue: "Input",
};
