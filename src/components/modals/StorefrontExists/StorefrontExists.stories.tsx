import { ComponentMeta } from "@storybook/react";
import { StorefrontExists } from "./StorefrontExists";

export default {
  title: "Compound/Modals/StorefrontExists",
  component: StorefrontExists,
} as ComponentMeta<typeof StorefrontExists>;

export const Default = () => (
  <StorefrontExists isOpen={true} storeName="Sweet Dreams" storeId="test" />
);
