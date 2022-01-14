import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MainSidebarContent } from "./MainSidebarContent";
import { Sidebar } from "components/Sidebar";

export default {
  title: "Compound/Sidebar/MainSidebar",
  component: MainSidebarContent,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof MainSidebarContent>;

const Template: ComponentStory<typeof MainSidebarContent> = (args) => (
  <Sidebar isOpen={true}>
    <MainSidebarContent {...args} />
  </Sidebar>
);

export const UserIsBuyer = Template.bind({});
UserIsBuyer.args = {
  user: {
    address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
    avatarUrl: "https://bit.ly/code-beast",
  },
};

export const UserIsBuyerNoAvatar = Template.bind({});
UserIsBuyerNoAvatar.args = {
  user: {
    address: "9ncWZT92PzDS4A5ibKkQ1vGsnPLQB3B5skuZWbrDX2uq",
  },
};

export const UserIsSeller = Template.bind({});
UserIsSeller.args = {};
