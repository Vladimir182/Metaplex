import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FileUpload } from "./FileUpload";

export default {
  title: "Forms/FileUpload",
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args) => (
  <FileUpload {...args} />
);

Template.argTypes = { onFileChange: { action: "fileChange" } };

export const Simple = Template.bind({});
Simple.args = {
  variant: "base",
};

export const CoverImage = Template.bind({});
CoverImage.argTypes = { onFileChange: { action: "onFileChange" } };

export const Preview = Template.bind({});
Preview.args = {
  variant: "preview",
};
