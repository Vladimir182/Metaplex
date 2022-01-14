import { FC } from "react";
import { Routes } from "react-router-dom";
import { render } from "./render";
import { SCHEMA } from "./schema";

export const AppRoutes: FC = () => {
  return (
    <Routes>{SCHEMA.map((route, i) => render(route, `${i}`, true))}</Routes>
  );
};
