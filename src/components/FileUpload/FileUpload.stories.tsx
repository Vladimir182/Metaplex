import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FileType } from "components/MediaTypeSelector/FileType";

import { FileUpload } from "./FileUpload";

export default {
  title: "Compound/FileUpload",
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args) => (
  <FileUpload {...args} />
);

Template.argTypes = { onFileChange: { action: "fileChange" } };

export const Simple = Template.bind({});
Simple.args = {
  type: FileType.VIDEO,
  variant: "base",
};

export const CoverImage = Template.bind({});
CoverImage.argTypes = { onFileChange: { action: "onFileChange" } };

export const Preview = Template.bind({});
Preview.args = {
  type: FileType.VIDEO,
  variant: "preview",
};

export const Logo = Template.bind({});
Logo.args = {
  type: FileType.VIDEO,
  variant: "logo-preview",
};
Logo.argTypes = { onFileChange: { action: "onFileChange" } };
