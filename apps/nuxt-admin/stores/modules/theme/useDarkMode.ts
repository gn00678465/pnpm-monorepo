import { ref, watch, computed, onScopeDispose, effectScope, type ComputedRef } from 'vue';
import { useColorMode, useCycleList, type BasicColorSchema } from '@vueuse/core';

export function useDarkMode(): UseDarkModeReturn {
  const scope = effectScope();
  const defaultMode = ref<BasicColorSchema>('auto');
  const modeList = ref<BasicColorSchema[]>(['auto', 'light', 'dark']);

  const colorMode = useColorMode();

  const { state, next } = useCycleList(modeList, {
    initialValue: colorMode
  });

  scope.run(() => {
    watch(
      state,
      () => {
        if (!modeList.value.includes(state.value)) {
          state.value = defaultMode.value;
        }
        colorMode.value = state.value as BasicColorSchema;
      },
      { immediate: true }
    );
  });

  /** dark mode */
  const darkMode = computed<boolean>(() => {
    const { store, system } = colorMode
    if (state.value === 'auto') {
      return system.value === 'dark';
    }
    return store.value === 'dark';
  });

  /** toggle dark mode */
  function toggleDarkMode() {
    next();
  }

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    themeScheme: colorMode.state,
    darkMode,
    toggleDarkMode
  };
}

export interface UseDarkModeReturn {
  themeScheme: Ref<BasicColorSchema>
  darkMode: ComputedRef<boolean>
  toggleDarkMode: () => void
}