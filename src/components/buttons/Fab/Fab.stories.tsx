import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ExpandIcon } from "components/Icons";

import { Fab } from ".";

export default {
  title: "Simple/InterfaceButtons/Fab",
  component: Fab,
} as ComponentMeta<typeof Fab>;

const Template: ComponentStory<typeof Fab> = (args) => <Fab {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <ExpandIcon w="20px" h="20px" />,
};
