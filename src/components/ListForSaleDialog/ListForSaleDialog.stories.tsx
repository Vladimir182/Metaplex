import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListForSaleDialog } from "./ListForSaleDialog";
export default {
  title: "Compound/ListForSaleDialog",
  component: ListForSaleDialog,
} as ComponentMeta<typeof ListForSaleDialog>;

const Template: ComponentStory<typeof ListForSaleDialog> = (args) => (
  <ListForSaleDialog {...args} />
);

export const Default = Template.bind({});
Default.parameters = { layout: "fullscreen" };
Default.args = {
  isVisible: true,
  hideModal: () => {},
  artworkSummary: {
    img: "https://bit.ly/dan-abramov",
    title: "Dan Abramov",
    artist: "Vomarba Nad",
    edition: 10,
    total: 4,
  },
};
