import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WalletNotConnected } from "./WalletNotConnected";

export default {
  title: "Views/StoreCreate/WalletNotConnected",
  component: WalletNotConnected,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof WalletNotConnected>;

export const Default: ComponentStory<typeof WalletNotConnected> = () => (
  <WalletNotConnected />
);
