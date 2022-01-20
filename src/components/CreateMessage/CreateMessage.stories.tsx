import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CreateMessage } from "./CreateMessage";

export default {
  title: "Simple/CreateMessage",
  component: CreateMessage,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof CreateMessage>;

export const Default: ComponentStory<typeof CreateMessage> = () => (
  <CreateMessage />
);
