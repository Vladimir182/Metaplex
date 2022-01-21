import { FC } from "react";
import { NotFoundView } from "views/NotFoundView";

export const AppNoAccess: FC = ({ children }) => {
  return <NotFoundView>{children || "Access denied"}</NotFoundView>;
};
