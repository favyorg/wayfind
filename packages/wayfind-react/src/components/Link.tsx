/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { RouterContext } from "../RouterContext";
import { IsEmptyObject } from "type-fest";
import type { ConfProps } from "./getComponents";
import { applyVars } from "@favy/wayfind";

type HTMLAnchorProps = React.HTMLProps<HTMLAnchorElement>;

type DefaultProps = HTMLAnchorProps & { href: string };

export type ToRouteProps<PATHS extends string, VARS> = {
  to: PATHS;
  // eslint-disable-next-line @typescript-eslint/ban-types
} & (IsEmptyObject<VARS> extends false ? { vars: VARS } : {});

export type LinkProps<PATHS extends string, VARS> =
  | (Omit<HTMLAnchorProps, "href"> & ToRouteProps<PATHS, VARS>)
  | DefaultProps;

export const makeLink = (config: ConfProps["Link"] = { active: {}, default: {} }) => {
  return <PATHS extends string, VARS>(props: LinkProps<PATHS, VARS>) => {
    const ctx = useContext(RouterContext);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const url = applyVars(props?.to, props.vars);

    const isActive = ctx.router?.isActive(url);

    const linkProps: any = {
      ...(config.default ?? {}),
      ...props,
    };

    if (isActive && config.active) {
      Object.keys(config.active).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const propValue: any = linkProps?.[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const configValue: any = config.active[key];

        if (configValue) {
          if (typeof propValue === "string") {
            linkProps[key] = [propValue, configValue].join(" ");
          } else if (Array.isArray(propValue)) {
            linkProps[key] = [...propValue, ...configValue];
          } else if (typeof propValue === "object") {
            linkProps[key] = { ...propValue, ...configValue };
          } else {
            linkProps[key] = configValue;
          }
        }
      });
    }

    return (
      <a
        {...linkProps}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        href={props?.href ?? url}
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (props?.to) {
            e.preventDefault();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ctx.router.go(url);
          }

          linkProps?.onClick?.(e);
        }}
      />
    );
  };
};
