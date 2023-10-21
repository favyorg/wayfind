/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterContext } from "./RouterContext";
import type { RouterInstance } from "@favy/wayfind";
import { RouteType } from "@favy/wayfind";
import { useEffect, useReducer } from "react";

export interface RouteProps<C extends RouteType<any, any>> extends React.PropsWithChildren {
  router: RouterInstance<C, any, any>;
}

export const Router = <C extends RouteType<any, any>>(props: RouteProps<C>) => {
  const [, render] = useReducer((value) => value + 1, Number.MIN_SAFE_INTEGER);

  useEffect(() => {
    window.addEventListener("popstate", render);
    return () => window.removeEventListener("popstate", render);
  }, []);

  const router = props.router?.route;

  const renderContent = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return typeof router.route === "function" ? router.route(router) : router.route?.render?.(router);
    } catch (error) {
      if (router.errorRender) {
        return router.errorRender({ error });
      }

      throw error;
    }
  };

  return (
    <RouterContext.Provider
      value={{
        routeContent: renderContent,
        router: props.router,
      }}
    >
      {props.children ?? renderContent()}
    </RouterContext.Provider>
  );
};
