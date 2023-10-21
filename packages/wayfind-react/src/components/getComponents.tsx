/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeLink, LinkProps, ToRouteProps } from "./Link";
import { RouterInstance, RouteType, ExtractVars } from "@favy/wayfind";
import { makeVarHook } from "../hooks/useVar";
import { Redirect } from "./Redirect";
import { makeIsActiveHook } from "../hooks/useIsActive";
import { makeNavigateHook } from "../hooks/useNavigate";

export interface ConfProps {
  Link?: {
    default?: React.HTMLProps<HTMLElement>;
    active?: React.HTMLProps<HTMLElement>;
  };
}

export const getComponents = <T extends RouterInstance<C, any, any>, C extends RouteType<any, any>>(
  router: T,
  config: ConfProps
) => {
  type RedirectProps = { [k in T["paths"]]: ToRouteProps<k, ExtractVars<k, string | number>> }[T["paths"]];
  return {
    Link: makeLink(config["Link"]) as (
      props: { [k in T["paths"]]: LinkProps<k, ExtractVars<k, string | number>> }[T["paths"]]
    ) => JSX.Element,
    Redirect: Redirect as (props: RedirectProps) => JSX.Element,
    useVar: makeVarHook<T["var"]>(),
    useIsActive: makeIsActiveHook<T["paths"]>(),
    useNavigate: makeNavigateHook<RedirectProps>(),
  };
};
