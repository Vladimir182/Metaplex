import { themes } from "@storybook/theming";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../src/theme";
import "../src/state/mock";

export const decorators = [
  (Story) => (
    <ChakraProvider resetCSS theme={theme}>
      <Story />
    </ChakraProvider>
  ),
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];

export const parameters = {
  chakra: { theme },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
  backgrounds: {
    values: [
      {
        name: "metaplex",
        value: "#121212",
      },
    ],
  },
};
