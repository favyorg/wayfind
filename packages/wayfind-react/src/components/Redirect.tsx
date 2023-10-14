import { useContext, useLayoutEffect } from "react";
import { RouterContext } from "../RouterContext";

export const Redirect = <T extends string, V>({ to, vars }: { to: T; vars: V }) => {
  const ctx = useContext(RouterContext).router;

  useLayoutEffect(() => {
    ctx?.go(to);
  });
};
