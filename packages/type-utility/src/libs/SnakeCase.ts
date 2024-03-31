type Snake<S extends string> = S extends `-${infer R}`
  ? `_${Uncapitalize<R>}`
  : S extends ` ${infer R}`
    ? `_${Uncapitalize<R>}`
    : S extends Uncapitalize<S>
      ? S
      : `_${Uncapitalize<S>}`;

/**
 * Convert string to snake_case
 * snake case => snake_case
 * kebab-Case => kebab_case
 * camelCase => camel_case
 * snake_case => snake_case
 */
type SnakeCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${SnakeCase<Snake<End>>}`
  : S;
