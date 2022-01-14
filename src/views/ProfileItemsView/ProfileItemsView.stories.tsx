import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProfileItemsView } from ".";

export default {
  title: "Views/ProfileItemsView",
  component: ProfileItemsView,
} as ComponentMeta<typeof ProfileItemsView>;

const Template: ComponentStory<typeof ProfileItemsView> = (args) => (
  <ProfileItemsView {...args} />
);

export const Default = Template.bind({});
Default.args = {};

Default.parameters = { layout: "fullscreen" };
