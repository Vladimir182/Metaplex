import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NewItemSidebarContent } from ".";
import { Sidebar } from "components/Sidebar";

export default {
  title: "Compound/Sidebar/NewItemSidebar",
  component: NewItemSidebarContent,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof NewItemSidebarContent>;

const Template: ComponentStory<typeof NewItemSidebarContent> = (args) => (
  <Sidebar isOpen={true}>
    <NewItemSidebarContent {...args} />
  </Sidebar>
);

export const Default = Template.bind({});
Default.args = {};
