import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FileType } from "components/MediaTypeSelector/FileType";
import { NftCreationForm } from "./NftCreationForm";

export default {
  title: "Compound/Forms/NftCreationForm",
  component: NftCreationForm,
} as ComponentMeta<typeof NftCreationForm>;

const Template: ComponentStory<typeof NftCreationForm> = (args) => (
  <NftCreationForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  refTriggerValidationFn: { current: () => Promise.resolve(false) },
  metadataCategory: FileType.IMAGE,
};
