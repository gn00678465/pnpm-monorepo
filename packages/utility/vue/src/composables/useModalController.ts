import { ref, effectScope, watch, onScopeDispose } from 'vue';
import type { Ref } from 'vue';

interface UseModalControllerOptions {
  modalValue?: 'show' | (object & string);
  delay?: number;
}

export function useModalController<T extends object>({
  modalValue = 'show',
  delay = 0
}: UseModalControllerOptions = {}) {
  const scope = effectScope();

  const visible = ref(false);
  const _delay = ref(delay);
  const data = ref<T | null>(null) as Ref<T | null>;

  function onModalOpen(values: T | null = null) {
    data.value = values;
    visible.value = true;
  }
  function onModalClose(delayTime = 0) {
    _delay.value = handleDelay(delay, delayTime);
    visible.value = false;
  }

  function handleDelay(delay: number, delayTime: number) {
    return delay === 0 && delayTime === 0
      ? 0
      : delay !== 0 && delayTime === 0
        ? delay
        : delayTime;
  }

  scope.run(() => {
    watch(visible, (visible) => {
      if (!visible) {
        window.setTimeout(() => {
          data.value = null;
        }, _delay.value);
      }
    });
  });

  onScopeDispose(() => {
    onModalClose();
  });

  return {
    [modalValue]: visible,
    onModalOpen,
    onModalClose,
    data
  };
}

export type UseNModalReturnType = ReturnType<typeof useModalController>;
