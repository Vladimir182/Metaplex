import { ComponentMeta } from "@storybook/react";
import { HowToBuy } from "./HowToBuy";

export default {
  title: "Compound/Modals/HowToBuy",
  component: HowToBuy,
} as ComponentMeta<typeof HowToBuy>;

export const Default = () => <HowToBuy storeName="Sweet Dreams" />;
