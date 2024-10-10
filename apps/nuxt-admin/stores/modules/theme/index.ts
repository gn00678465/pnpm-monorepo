import {
  ref,
  computed,
  reactive,
  effectScope,
  onScopeDispose,
} from 'vue';
import { defineStore } from 'pinia';
import type { LayoutMode } from '@pnpm-monorepo/layouts';
import type { AppConfig } from '../../../types'
import { useDarkMode } from './useDarkMode';
import { createNaiveThemeColors } from '@pnpm-monorepo/eve-ui-kit/naive-ui'

export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope()
  const appConfig = useAppConfig()
  // layout
  const fixedHeaderAndTab = ref(false)
  const layout = reactive(appConfig.layout as AppConfig['layout'])
  const header = reactive(appConfig.header as AppConfig['header'])
  const sidebar = reactive(appConfig.sidebar as AppConfig['sidebar'])
  const footer = reactive(appConfig.footer as AppConfig['footer'])

  /** dark mode */
  const { darkMode, toggleThemeScheme, themeScheme } = useDarkMode()

  /** theme */
  const lightThemeOverrideCommon = computed(() => ({ name: 'eve-ui-light-common', ...createNaiveThemeColors(false) }))
  const darkThemeOverrideCommon = computed(() => ({ name: 'eve-ui-dark-common', ...createNaiveThemeColors(true) }))

  onScopeDispose(() => {
    scope.stop();
  });

  function setThemeLayout(_layout: LayoutMode) {
    layout.mode = _layout
  }

  return {
    // dark mode
    themeScheme: themeScheme,
    darkMode,
    toggleThemeScheme,
    // layout
    layout,
    fixedHeaderAndTab,
    header,
    sidebar,
    footer,
    setThemeLayout,
    // theme
    lightThemeOverrideCommon,
    darkThemeOverrideCommon
  };
})