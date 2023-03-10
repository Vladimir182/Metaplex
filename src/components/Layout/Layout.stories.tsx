/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Layout } from ".";

export default {
  title: "Layout",
  component: Layout,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof Layout>;

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices mollis nibh ut sodales. " +
  "Aenean facilisis tincidunt velit quis finibus. Sed scelerisque, nunc eget maximus posuere, leo mi " +
  "volutpat diam, at dictum nibh arcu a risus. Phasellus suscipit neque non risus tempor rutrum. Etiam " +
  "id mi lectus. Curabitur interdum sagittis augue. Mauris tortor tellus, consequat in efficitur eu, " +
  "tincidunt ac urna. Pellentesque nisi ipsum, viverra eu purus vitae, euismod tempor ligula. Nam maximus " +
  "lorem ac consequat interdum. Pellentesque feugiat mauris ut placerat ullamcorper. Morbi eu sem nec " +
  "nulla euismod tempor. Donec congue arcu in nunc tempus rhoncus. Orci varius natoque penatibus et " +
  "magnis dis parturient montes, nascetur ridiculus mus.";

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const NarrowContent = Template.bind({});
NarrowContent.args = {
  narrow: true,
  children: (
    <div style={{ whiteSpace: "pre-wrap" }}>
      {[...new Array(5)].map(() => lorem).join("\n\n")}
    </div>
  ),
};

export const WideContent = Template.bind({});
WideContent.args = {
  children: (
    <div style={{ whiteSpace: "pre-wrap" }}>
      {[...new Array(5)].map(() => lorem).join("\n\n")}
    </div>
  ),
};
