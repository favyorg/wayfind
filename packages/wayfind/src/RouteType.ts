// type ReplaceVars<T extends string> = T extends `${infer L}{${string}}${infer R}` ? `${L}${number}${ReplaceVars<R>}` : T;

type RouteRender<RET> = (params: unknown) => RET;

type RouteParams<RET, ID extends string> = {
  render: RouteRender<RET>;
  id?: ID;
  error: <T>(props: { error: unknown }) => T;
  404: <T>() => T;
};

export type RouteType<T, ID extends string> = {
  [k in `/${string}`]: RouteType<T, ID> | RouteParams<T, ID> | RouteRender<T>;
};
