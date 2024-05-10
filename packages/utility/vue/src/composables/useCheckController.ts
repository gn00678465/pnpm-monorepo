import { ref, toValue } from "vue";
import type { Ref, MaybeRef } from "vue";

export interface UseCheckControllerOptions<T extends string | number | boolean> {
  initialValue: MaybeRef<T>;
  beforeChange?: () => boolean | Promise<boolean>;
}

export function useCheckController<T extends string | number | boolean>(
  options: UseCheckControllerOptions<T>
) {
  const { initialValue, beforeChange = () => true } = options;
  const _value = ref<T>(toValue(initialValue)) as Ref<T>;

  async function onUpdate(value: T) {
    const _flag = await beforeChange();
    if (_flag) {
      _value.value = value;
    }
  }

  function handleUpdate(fn: (arg: T) => void | Promise<void>) {
    return async (value: T) => {
      const _flag = await beforeChange();
      if (_flag) {
        _value.value = value;
        await fn(value);
      }
    };
  }

  return {
    checked: _value,
    onUpdateChecked: onUpdate,
    handleUpdateChecked: handleUpdate
  };
}
