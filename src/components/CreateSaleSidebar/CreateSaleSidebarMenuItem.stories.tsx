import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateSaleSidebarContent } from ".";
import { Sidebar } from "components/Sidebar";

export default {
  title: "Compound/Sidebar/CreateSaleSidebar",
  component: CreateSaleSidebarContent,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof CreateSaleSidebarContent>;

const Template: ComponentStory<typeof CreateSaleSidebarContent> = (args) => (
  <Sidebar isOpen={true}>
    <CreateSaleSidebarContent {...args} />
  </Sidebar>
);

export const Default = Template.bind({});
Default.args = {};
