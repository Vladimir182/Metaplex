import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Sidebar } from "components/Sidebar";
import { SidebarMenuItemWrapper } from "components/Sidebar/SidebarMenuItemWrapper";

export default {
  title: "Compound/Sidebar/SidebarMenuItemWrapper",
  component: SidebarMenuItemWrapper,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof SidebarMenuItemWrapper>;

const Template: ComponentStory<typeof SidebarMenuItemWrapper> = (args) => (
  <Sidebar isOpen={true}>
    <SidebarMenuItemWrapper {...args} />
  </Sidebar>
);

export const Default = Template.bind({});
Default.args = {};
