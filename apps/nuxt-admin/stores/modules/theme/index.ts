import {
  ref,
  computed,
  reactive,
  effectScope,
  onScopeDispose,
  watch
} from 'vue';
import { defineStore } from 'pinia';
import type { GlobalThemeOverrides } from 'naive-ui';
import type { LayoutMode } from '@pnpm-monorepo/layouts';
import { createNaiveThemeColors } from '@pnpm-monorepo/naive-ui-extension';
import { createAntdColorPalletteVars } from '@pnpm-monorepo/color'
import { addCssVarsToGlobal, camelToKebab } from '@pnpm-monorepo/utility'
import type { AppConfig } from '../../../types'
import { useDarkMode } from './useDarkMode';

export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope()
  const appConfig = useAppConfig()
  // layout
  const fixedHeaderAndTab = ref(false)
  const layout = reactive(appConfig.layout) as AppConfig['layout']
  const header = reactive(appConfig.header) as AppConfig['header']
  const sidebar = reactive(appConfig.sidebar) as AppConfig['sidebar']
  const footer = reactive(appConfig.footer) as AppConfig['footer']

  /** dark mode */
  const { darkMode, toggleThemeScheme, themeScheme } = useDarkMode()

  /** theme */
  const themeColor = reactive(Object.assign(appConfig.theme, {
    primary: '#1677ff',
    info: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  }))

  const naiveThemeColors = computed(() => createNaiveThemeColors(themeColor, { darkMode: darkMode.value }))


  const themeOverridesCommon = computed<GlobalThemeOverrides['common']>(() => ({
    ...naiveThemeColors.value
  }))


  scope.run(() => {
    if (import.meta.client) {
      watch(darkMode, (_darkMode) => {
        setColorPalletteToGlobal(_darkMode)
      }, { immediate: true })
    }
  })

  function setColorPalletteToGlobal(darkMode: boolean) {
    const data = createAntdColorPalletteVars(themeColor, { type: 'nested', theme: darkMode ? 'dark' : 'default', format: 'rgbString' })
    const naiveData = Object.fromEntries(Object.entries(naiveThemeColors.value as Record<string, string>).map(([key, _]) => [camelToKebab(key.replace('Color', '')), _]))
    addCssVarsToGlobal([data, naiveData])
  }

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
    themeColor,
    themeOverridesCommon
  };
})