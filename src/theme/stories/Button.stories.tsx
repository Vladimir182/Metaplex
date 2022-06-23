import { Button } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Simple/UI kit/Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["solid", "primary", "secondary", "tertiary", "ghost", "link"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: "solid",
  children: "Button",
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Button",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
  children: "Button",
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
  children: "Link",
};
