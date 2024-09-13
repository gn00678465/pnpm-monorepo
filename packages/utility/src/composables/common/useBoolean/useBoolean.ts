import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'

export function useBoolean(initialValue: MaybeRefOrGetter<boolean> = false): UseBooleanReturn {
  const _initialValue = toValue(initialValue)
  const bool = ref<boolean>(_initialValue)

  function setTrue(): void {
    bool.value = true
  }

  function setFalse(): void {
    bool.value = false
  }

  function toggle(): void {
    bool.value = !bool.value
  }

  function setBool(value: boolean): void {
    bool.value = value
  }

  return {
    bool,
    setTrue,
    setFalse,
    setBool,
    toggle,
  }
}

export interface UseBooleanReturn {
  bool: Ref<boolean>
  setTrue: () => void
  setFalse: () => void
  setBool: (value: boolean) => void
  toggle: () => void
}
