import { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FileType } from "./FileType";
import { MediaTypeSelector } from "./MediaTypeSelector";

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
