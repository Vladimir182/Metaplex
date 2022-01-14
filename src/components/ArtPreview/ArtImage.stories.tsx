import { ComponentMeta } from "@storybook/react";
import { ArtImage } from "./ArtImage";

export default {
  title: "Simple/ArtImage",
  component: ArtImage,
} as ComponentMeta<typeof ArtImage>;

export const Default = () => (
  <ArtImage
    uri={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
  />
);
