import { Text } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Simple/UI kit/Text",
  component: Text,
  argTypes: {
    variant: {
      options: [
        "subtitle",
        "subtitle-bold",
        "lead",
        "body-large",
        "body",
        "body-bold",
        "button",
        "label",
        "label-bold",
        "small",
        "small-bold",
      ],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const SubtitleRegular = Template.bind({});
SubtitleRegular.args = {
  variant: "subtitle",
  children: "Subtitle Regular",
};

export const SubtitleBold = Template.bind({});
SubtitleBold.args = {
  variant: "subtitle-bold",
  children: "Subtitle Bold",
};

export const Lead = Template.bind({});
Lead.args = {
  variant: "lead",
  children: "Lead",
};

export const BodyLarge = Template.bind({});
BodyLarge.args = {
  variant: "body-large",
  children: "Body large",
};

export const BodyRegular = Template.bind({});
BodyRegular.args = {
  variant: "body",
  children: "Body regular",
};

export const BodyBold = Template.bind({});
BodyBold.args = {
  variant: "body-bold",
  children: "Body bold",
};

export const Button = Template.bind({});
Button.args = {
  variant: "button",
  children: "Button",
};

export const LabelRegular = Template.bind({});
LabelRegular.args = {
  variant: "label",
  children: "Label Regular",
};

export const LabelBold = Template.bind({});
LabelBold.args = {
  variant: "label-bold",
  children: "Label Bold",
};

export const SmallRegular = Template.bind({});
SmallRegular.args = {
  variant: "small",
  children: "Small Regular",
};

export const SmallBold = Template.bind({});
SmallBold.args = {
  variant: "small-bold",
  children: "Small Bold",
};
