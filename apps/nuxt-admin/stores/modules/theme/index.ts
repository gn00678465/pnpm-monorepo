import {
  ref,
  computed,
  reactive,
  effectScope,
  onScopeDispose,
  watch,
} from 'vue';
import { defineStore } from 'pinia';
import type { GlobalThemeOverrides } from 'naive-ui';
import { useDarkMode } from './useDarkMode';
import type { LayoutMode } from '@pnpm-monorepo/layouts';
import { createNaiveThemeColors } from '@pnpm-monorepo/naive-ui-extension';
import { createAntdColorPalletteVars } from '@pnpm-monorepo/color'
import { addCssVarsToGlobal } from '@pnpm-monorepo/utility'
import type { ThemeLayout, ThemeFooter, ThemeHeader, ThemeSidebar } from '../../../types'

export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope();
  const appConfig = useAppConfig()
  // layout
  const fixedHeaderAndTab = ref(false)
  const layout = reactive(appConfig.layout) as ThemeLayout
  const header = reactive(appConfig.header) as ThemeHeader
  const sidebar = reactive(appConfig.sidebar) as ThemeSidebar
  const footer = reactive(appConfig.footer) as ThemeFooter

  /** dark mode */
  const { darkMode, toggleDarkMode, themeScheme } = useDarkMode();

  /** theme */
  const themeColor = reactive(Object.assign(appConfig.theme, {
    primary: '#1677ff',
    info: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  }))

  const themeOverridesCommon = computed<GlobalThemeOverrides['common']>(() => ({
    ...createNaiveThemeColors(themeColor, { darkMode: darkMode.value })
  }))

  onBeforeMount(() => {
    const data = createAntdColorPalletteVars(themeColor, { type: 'nested', theme: darkMode.value ? 'dark' : 'default' })
    addCssVarsToGlobal(data)
  })

  scope.run(() => {
    watch(darkMode, (_darkMode) => {
      const data = createAntdColorPalletteVars(themeColor, { type: 'nested', theme: _darkMode ? 'dark' : 'default' })
      addCssVarsToGlobal(data)
    })
  })

  onScopeDispose(() => {
    scope.stop();
  });

  function setThemeLayout(_layout: LayoutMode) {
    layout.mode = _layout
  }

  return {
    // dark mode
    themeScheme,
    darkMode,
    toggleDarkMode,
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