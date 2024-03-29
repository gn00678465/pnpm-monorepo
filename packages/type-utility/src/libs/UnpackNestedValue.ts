declare const $NestedValue: unique symbol;

export type NestedValue<TValue extends object = object> = {
  [$NestedValue]: never;
} & TValue;

export type UnpackNestedValue<T> =
  T extends NestedValue<infer U>
    ? U
    : T extends Date | FileList | File | Blob
      ? T
      : T extends object
        ? { [K in keyof T]: UnpackNestedValue<T[K]> }
        : T;
