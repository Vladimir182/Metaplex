/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentProps,
  createElement,
  FC,
  JSXElementConstructor,
  useMemo,
} from "react";
import type { ComponentStory } from "@storybook/react";
import { fork } from "effector";
import { Provider } from "effector-react/ssr";

export function createTemplate<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>(Component: T) {
  const Template: ComponentStory<T> = (args) => createElement(Component, args);
  return Template.bind({});
}

export type ScopeParams = Parameters<typeof fork>[0];

export function createTemplateWithScope<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>(Component: T, params: ScopeParams) {
  const Wrap: FC<ComponentProps<T>> = (props) => {
    const scope = useMemo(() => fork(params), []);

    return createElement(
      Provider,
      { value: scope },
      createElement(Component, props)
    );
  };
  const Template: ComponentStory<typeof Wrap> = (args) =>
    createElement(Wrap, args);
  return Template.bind({});
}
