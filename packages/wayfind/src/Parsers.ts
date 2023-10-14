// type MaybeVarDefaultType<T extends string> = T extends `${string}|${infer S}` ? S : "";
// type MaybeVarType<T extends string> = T extends `${string}:${infer S}` ? S : "";
// type ParseVar<T extends string> = T extends `${string}{${infer S}}${infer R}` ? S : "";
// --------

// interface HKT {
//   readonly param: string;
//   readonly result: unknown;
// }
// type Apply<F extends HKT, A> = (F & { param: A })["result"];
// // --------

// type BooleanParser<T> = (value: T) => T extends "true" ? true : false;
// const boolParser = <T>(value: T): T extends "true" ? true : false => (value === "true" ? true : false);

// interface NumHKT extends HKT {
//   result: typeof boolParser<this["param"]>;
// }

// type xx = Apply<NumHKT, `true`>;
// const d: xx = true;

export const parsers = {
  number: (value: string) => Number(value),
  string: (value: string) => value,
  // boolean: (value: string) => Boolean(value),
};

export type Parsers = {
  [k in keyof typeof parsers]: ReturnType<(typeof parsers)[k]>;
};
