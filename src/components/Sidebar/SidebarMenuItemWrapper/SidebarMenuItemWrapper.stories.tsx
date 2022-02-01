import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SidebarMenuItemWrapper } from "components/Sidebar/SidebarMenuItemWrapper";
import { Sidebar } from "components/Sidebar";

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
