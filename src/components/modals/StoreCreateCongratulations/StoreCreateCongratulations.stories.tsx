import { ComponentMeta } from "@storybook/react";
import { StoreCreateCongratulations } from "./StoreCreateCongratulations";

export default {
  title: "Compound/Modals/StoreCreateCongratulations",
  component: StoreCreateCongratulations,
} as ComponentMeta<typeof StoreCreateCongratulations>;

export const Default = () => <StoreCreateCongratulations />;
