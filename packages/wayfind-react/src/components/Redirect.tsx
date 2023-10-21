import { useContext, useLayoutEffect } from "react";
import { RouterContext } from "../RouterContext";
import { ToRouteProps } from "./Link";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Redirect = <T extends string, V>({ to, vars }: ToRouteProps<T, V>) => {
  const ctx = useContext(RouterContext).router;

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ctx?.go(to, vars);
  });

  return <></>;
};
