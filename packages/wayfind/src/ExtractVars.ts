import { Parsers } from "./Parsers";

export type ExtractVars<T extends string, DEF = number> = T extends `${string}{${infer S}}${infer R}`
  ? (S extends `${infer N}:${infer Y}`
      ? {
          [k in N]: Parsers extends {
            [kk in Y]: infer R;
          }
            ? R
            : DEF;
        }
      : {
          [k in S]: DEF;
        }) &
      ExtractVars<R, DEF>
  : // eslint-disable-next-line @typescript-eslint/ban-types
    {};
