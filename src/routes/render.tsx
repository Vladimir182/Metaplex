import { Route } from "react-router-dom";
import { useStore } from "effector-react";
import { AppLoading } from "views/routes/AppLoading";
import { AppNoAccess } from "views/routes/AppNoAccess";
import { ISchema } from "./types";
import { Store } from "effector";

export function render(
  {
    path,
    view,
    index,
    subroute,
    guard,
    guardView = AppNoAccess,
    guardLoading = AppLoading,
    ...props
  }: ISchema,
  key: string,
  root = true
) {
  const hasAccess =
    guard === undefined
      ? true
      : guard instanceof Function
      ? guard()
      : useStore(guard as Store<boolean | null>);
  const p = path === "*" ? "*" : root ? path?.path : path?.routeName;
  const View =
    hasAccess === false ? guardView : hasAccess === null ? guardLoading : view;
  return (
    <Route
      key={key}
      {...props}
      index={index}
      path={p ?? "*"}
      element={<View />}
    >
      {subroute
        ? subroute.map((route, i) => render(route, `${key}.${i}`, false))
        : null}
    </Route>
  );
}
