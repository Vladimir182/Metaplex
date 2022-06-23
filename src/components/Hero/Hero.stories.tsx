import { Button } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Layout } from "components/Layout";

import { Hero } from "./Hero";

export default {
  title: "Simple/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => (
  <Layout transparentNavbar>
    <Hero {...args} />
  </Layout>
);

export const Default = Template.bind({});
Default.args = {
  title: "Street Dreams",
  text: "Store description",
};

export const WithButton = Template.bind({});
WithButton.args = {
  title: "Street Dreams",
  text: "Store description",
  children: <Button variant="primary">How to buy</Button>,
};

export const WithTwoButton = Template.bind({});
WithTwoButton.args = {
  title: "Street Dreams",
  text: "Store description",
  children: (
    <>
      <Button size="lg">Create Store</Button>
      <Button size="lg" variant="tertiary">
        Developer Docs
      </Button>
    </>
  ),
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  title: "Launch NFTs from your own branded storefront",
  text: "Discover why thousands of teams use Metaplex to share NFTs with their community.",
  children: <Button size="lg">Create Store</Button>,
};

export const WithCoverImage = Template.bind({});
WithCoverImage.args = {
  title: "Launch NFTs from your own branded storefront",
  text: "Discover why thousands of teams use Metaplex to share NFTs with their community.",
  children: <Button size="lg">Create Store</Button>,
  logo: "https://fundacja2act.org/wp-content/uploads/2020/02/sample-logo-white.png",
  coverImage: "https://picsum.photos/id/1051/1024/448",
};
