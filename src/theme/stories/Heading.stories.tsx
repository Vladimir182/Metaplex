import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Heading } from "@chakra-ui/react";

export default {
  title: "Simple/UI kit/Heading",
  component: Heading,
  argTypes: {
    variant: {
      options: ["h1", "h2", "h3", "h4", "h5"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Heading1 = Template.bind({});
Heading1.args = {
  variant: "h1",
  children: "Headline 1",
};

export const Heading2 = Template.bind({});
Heading2.args = {
  variant: "h2",
  children: "Headline 2",
};

export const Heading3 = Template.bind({});
Heading3.args = {
  variant: "h3",
  children: "Headline 3",
};

export const Heading4 = Template.bind({});
Heading4.args = {
  variant: "h4",
  children: "Headline 4",
};

export const Heading5 = Template.bind({});
Heading5.args = {
  variant: "h5",
  children: "Headline 5",
};
