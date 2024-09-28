import { ref, watch, computed, onScopeDispose, effectScope, type ComputedRef, onBeforeMount } from 'vue';
import { usePreferredColorScheme, useStorage, type BasicColorSchema, type RemovableRef } from '@vueuse/core';

export interface UseDarkModeOptions {
  storage?: 'localStorage' | 'sessionStorage'
  classPrefix?: string
  classSuffix?: string
}

export function useDarkMode(options: UseDarkModeOptions = {}): UseDarkModeReturn {
  const DARK_CLASS = 'dark'
  const { storage = 'localStorage', classPrefix = '', classSuffix = '' } = options

  const scope = effectScope()

  const osTheme = usePreferredColorScheme()
  const themeScheme = ref<BasicColorSchema>('auto')
  let themeSchemeStore: RemovableRef<BasicColorSchema>

  /** dark mode */
  const darkMode = computed(() => {
    if (themeScheme.value === 'auto') {
      return osTheme.value === 'dark';
    }
    return themeScheme.value === 'dark';
  });


  function setThemeScheme(value: BasicColorSchema) {
    themeScheme.value = value;
  }

  function toggleThemeScheme() {
    const themeSchemes: BasicColorSchema[] = ['auto', 'light', 'dark']
    const index = themeSchemes.findIndex(item => item === themeScheme.value)
    const length = themeSchemes.length
    const nextIndex = (index % length + length) % length
    const nextThemeScheme = themeSchemes[nextIndex]
    setThemeScheme(nextThemeScheme)
    themeSchemeStore.value = nextThemeScheme
  }

  onBeforeMount(() => {
    if (storage === 'localStorage' || storage === 'sessionStorage') {
      themeSchemeStore = useStorage<BasicColorSchema>('themeScheme', 'auto', storage === 'localStorage' ? localStorage : sessionStorage)
    }

    themeScheme.value = themeSchemeStore.value
  })

  scope.run(() => {
    if (import.meta.client) {
      watch(
        darkMode,
        val => {
          toggleCssDarkMode(val)
        }, {
        immediate: true
      }
      )
    }
  })

  function toggleCssDarkMode(darkMode = false) {
    const darkClass = classPrefix + DARK_CLASS + classSuffix
    if (darkMode) {
      document.documentElement.classList.add(darkClass);
    } else {
      document.documentElement.classList.remove(darkClass);
    }
  }

  onScopeDispose(() => {
    scope.stop();
  })

  return {
    themeScheme: themeScheme,
    darkMode,
    toggleThemeScheme
  };
}

export interface UseDarkModeReturn {
  themeScheme: Ref<BasicColorSchema>
  darkMode: ComputedRef<boolean>
  toggleThemeScheme: () => void
}