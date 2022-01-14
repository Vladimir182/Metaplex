import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MdGolfCourse } from "react-icons/md";

import { HaloedIcon } from ".";

export default {
  title: "Simple/HaloedIcon",
  component: HaloedIcon,
} as ComponentMeta<typeof HaloedIcon>;

const Template: ComponentStory<typeof HaloedIcon> = (args) => (
  <HaloedIcon {...args} />
);

export const MdIcon = Template.bind({});
MdIcon.args = {
  icon: MdGolfCourse,
};

export const Emoji = Template.bind({});
Emoji.args = {
  emoji: "🎉",
};
