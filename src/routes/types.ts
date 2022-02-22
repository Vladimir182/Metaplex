import type { Store } from "effector";
import type { ComponentProps, FC } from "react";
import type { Route } from "react-router-dom";
import { ROUTES } from "routes";

export type TValues = typeof ROUTES[keyof typeof ROUTES];
export type Props = Omit<ComponentProps<typeof Route>, "path">;
export type Guard =
  | Store<boolean | null>
  | Store<boolean>
  | (() => boolean | null)
  | (() => boolean);

export interface ISchema extends Omit<Props, "children" | "element"> {
  path?: (TValues & { routeName?: string }) | "*";
  view: FC;
  guard?: Guard;
  guardView?: FC;
  guardLoading?: FC;
  index?: boolean;
  subroute?: ISchema[];
}
