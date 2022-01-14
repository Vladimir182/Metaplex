import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { MediaTypeSelector } from "./MediaTypeSelector";
import { FileType } from "./FileType";

export default {
  title: "Simple/MediaTypeSelector",
  component: MediaTypeSelector,
} as ComponentMeta<typeof MediaTypeSelector>;

const Template: ComponentStory<typeof MediaTypeSelector> = () => {
  const [category, onCategorySelect] = useState(FileType.AUDIO);
  return (
    <MediaTypeSelector
      category={category}
      onCategorySelect={onCategorySelect}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
