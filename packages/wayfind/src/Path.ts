/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteType } from "./RouteType";

type PathWalk<P extends RouteType<any, any>, K extends keyof P> =
  | K
  | {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      [k in K]: P[k] extends RouteType<any, any> ? `${k extends "/" ? "" : k}${Path<P[k]>}` : k;
    }[K];

export type Path<P extends RouteType<any, any>> = PathWalk<P, keyof P & `/${string}`>;
