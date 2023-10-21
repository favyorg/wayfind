import { RouteType } from "./RouteType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const route = <const C extends RouteType<any, any>>(config: C) => {
  return config;
};
