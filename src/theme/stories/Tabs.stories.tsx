import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";

export default {
  title: "Simple/UI kit/Tabs",
  component: Tabs,
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
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <TabList>
      <Tab>All</Tab>
      <Tab>Masters</Tab>
      <Tab>Editions</Tab>
    </TabList>
  ),
};
