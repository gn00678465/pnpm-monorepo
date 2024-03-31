/**
 * type NestedObjectType = {
 * a: string; b: string;
 * nest: { c: string; };
 * otherNest: { c: string; };
 * }
 * type NestedObjectPaths = Paths<NestedObjectType>
 * NestedObjectPaths =  "a" | "b" | "nest" | "otherNest" | "nest.c" | "otherNest.c"
 */
export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}`;
    }[keyof T]
  : never;
