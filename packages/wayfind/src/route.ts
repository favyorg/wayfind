import { RouteType } from "./RouteType";

export const route = <const C extends RouteType<any, any>>(config: C) => {
  return config;
};
