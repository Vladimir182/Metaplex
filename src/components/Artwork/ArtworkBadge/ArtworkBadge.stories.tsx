import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArtworkBadge } from "./ArtworkBadge";
import { Image } from "@chakra-ui/react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { fontSizes } from "theme/typography";

export default {
  title: "Compound/Artwork/ArtworkBadge",
  component: ArtworkBadge,
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#121212" }],
    },
  },
} as ComponentMeta<typeof ArtworkBadge>;

const Template: ComponentStory<typeof ArtworkBadge> = (args) => (
  <ArtworkBadge {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <Image
      w="120px"
      h="120px"
      borderRadius={1}
      src="https://picsum.photos/id/1051/560/560"
    />
  ),
  badgeContent: <MdOutlineLocalOffer size={fontSizes["2xl"]} />,
};
