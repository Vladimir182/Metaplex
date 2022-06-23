import { Textarea } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Simple/UI kit/Textarea",
  component: Textarea,
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
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const TextareaEmpty = Template.bind({});
TextareaEmpty.args = {};

export const TextareaEmptyPlaceholder = Template.bind({});
TextareaEmptyPlaceholder.args = {
  placeholder: "Textarea",
};

export const TextareaWithText = Template.bind({});
TextareaWithText.args = {
  defaultValue: "Textarea",
};
