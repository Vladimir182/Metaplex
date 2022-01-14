import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArtType } from "state/artworks";
import { ItemView } from ".";

export default {
  title: "Views/ItemView",
  component: ItemView,
} as ComponentMeta<typeof ItemView>;

const Template: ComponentStory<typeof ItemView> = (args) => (
  <ItemView
    {...args}
    defaultArtwork={{
      id: "1",
      format: "image",
      type: ArtType.Master,
      image:
        "https://images.freeimages.com/images/large-previews/277/doggy-1382866.jpg",
      title: "Morning",
      description:
        "Street Dreams is a collective of creators rooted in photography who have invested heavily in the art of photography. Co-Founders Michael Cobarrubia, Steven Irby, Eric Veloso, have taken their love of photography and turned it into a calling for their peers, as well as an rapidly expanding publishing and multimedia brand.\n\nIn 2014, with a disruptive approach to the publishing industry, SDM launched as a quarterly print publication, with a strong focus on crowdsourcing photographic talent online and bringing their hundred-thousand strong community offline through magazine launches, gallery exhibitions, and mixed-media art shows.",
      creators: [
        {
          address: "1231f23fd23f",
          share: 100,
          verified: true,
        },
      ],
    }}
  />
);

export const Buy = Template.bind({});
Buy.args = {
  variant: "buy",
};
Buy.parameters = { layout: "fullscreen" };

export const Sell = Template.bind({});
Sell.args = {
  variant: "sell",
};
Sell.parameters = { layout: "fullscreen" };
