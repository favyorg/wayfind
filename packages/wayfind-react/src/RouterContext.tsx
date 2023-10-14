import { createContext } from "react";
import { RouterInstance } from "@favy/wayfind";

export const RouterContext = createContext({
  router: undefined as RouterInstance<any, any, any> | undefined,
  routeContent: undefined as any,
});
