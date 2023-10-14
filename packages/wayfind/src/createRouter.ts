/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsEmptyObject, UnionToIntersection } from "type-fest";
import { ExtractVars } from "./ExtractVars";
import { Path } from "./Path";
import { RouteType } from "./RouteType";
import { parsers } from "./Parsers";

export const createRouter = <const C extends RouteType<any, any>>(config: C) => {
  type PATHS = Path<C>;

  let currentRoute = {
    vars: {},
    route: undefined as RouteType<any, any> | undefined,
  };

  const routes = compileRoute(config);

  const handleChange = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    currentRoute = findRoute(routes, document.location.pathname + document.location.search);

    const NotFound = { route: (config as any)["404"] ?? "Not Found - 404", vars: {} };

    if (
      !currentRoute ||
      (typeof currentRoute.route !== "function" && typeof (currentRoute as any).route.render !== "function")
    ) {
      currentRoute = NotFound;
    }
  };
  window.addEventListener("popstate", handleChange);
  handleChange();

  type RemoveType<S extends string> = S extends `${infer L}{${infer N}:${infer T}}${infer R}`
    ? `${L}{${N}}${RemoveType<R>}`
    : S;

  type PV = RemoveType<PATHS>;
  type PO = { [k in PV]: k | `${k}?${string}` | `${k}#${string}` }[PV];

  return {
    config,
    go: (path: string, vars: any) => {
      history.pushState(null, "", applyVars(path, vars));
      window.dispatchEvent(new PopStateEvent("popstate"));
    },
    get var() {
      return currentRoute?.vars ?? {};
    },
    get route() {
      return currentRoute;
    },
    paths: undefined as any,
    match: (path: string) => {
      return findRoute(routes, path);
    },
    isActive(path: string) {
      return findRoute(routes, path)?.route === currentRoute?.route;
    },
  } as any as RouterInstance<C, PO, Partial<UnionToIntersection<ExtractVars<PATHS>>>>;
};

type W<K, VARS> = IsEmptyObject<VARS> extends false ? [K, VARS] : [K];

export type RouterInstance<C extends RouteType<any, any>, P extends string, V> = {
  config: C;
  go<K extends P>(...args: W<K, ExtractVars<K, string | number>>): unknown;
  // on<FN extends () => unknown>(type: RouterEventTypes, callback: FN): () => unknown;
  var: V;
  route: {
    vars: Record<string, string>;
    route: RouteType<any, any>[keyof RouteType<any, any>];
  };
  match(path: string): unknown;
  isActive(path: string): boolean;
  paths: P;
};

export const compileRoute = <C extends RouteType<any, any>>(route: C) => {
  const routeMap: any = flatRoute(route, "");
  const urls = Object.keys(routeMap);
  let errorRender: any;

  return urls.map((k) => {
    const varTypes = new Map<string, string>();
    const regString = k.replace(/[\s!#$()+,.:<=?[\\\]^|]/g, "\\$&").replace(/\{(.+?)\}/g, (_, name) => {
      const [varName, varType] = name.split("\\:");
      varTypes.set(varName, varType);

      return `(?<${varName}>.+)`;
    });
    const regEx = new RegExp("^" + regString + "$", "gi");

    if (routeMap[k].error) {
      errorRender = routeMap[k].error;
    }

    return {
      parse: (path: string) => {
        const res = regEx.exec(path);
        regEx.lastIndex = 0;

        if (res) {
          const vars = (res as any)?.groups ?? {};

          for (const [name, type = "number"] of varTypes) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            vars[name] = parsers[type](vars[name]);
          }

          return {
            route: routeMap[k],
            vars,
            errorRender,
          };
        }
      },
      isActive: (path: string) => regEx.test(path),
    };
  });
};

const findRoute = <R>(routes: R, path: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  for (const r of routes) {
    const res = r.parse(path);
    if (res) return res;
  }
};

const isActive = <R>(routes: R, path: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  for (const r of routes) {
    const res = r.isActive(path);
    if (res) return res;
  }
};

const flatRoute = <T>(route: RouteType<T, any>, prefix = "", res: Record<string, unknown> = {}) => {
  const keys = Object.keys(route);
  for (const key of keys) {
    if (!key.startsWith("/")) continue;

    const next = `${prefix === "/" ? "" : prefix}${key}`;
    res[next] = route[key as any];

    if (typeof route[key as any] === "object") {
      flatRoute(route[key as any] as any, next, res);
    }
  }

  return res;
};

export const applyVars = (path: string, vars: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return path.replace(/\{(.+?)\}/g, (_, name) => vars[name]);
};
