import { FC, useEffect } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

export const Redirect: FC<{ to: string } & NavigateOptions> = ({
  to,
  ...opts
}) => {
  const navigation = useNavigate();
  useEffect(() => {
    navigation(to, opts);
  }, []);
  return <></>;
};
