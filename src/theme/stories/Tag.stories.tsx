import { Tag } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI kit/Tag",
  component: Tag,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    colorScheme: {
      options: ["green", "purple", "pink", "gray", "whiteAlpha"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Airweave",
  size: "md",
  variant: "outline",
  colorScheme: "whiteAlpha",
};
