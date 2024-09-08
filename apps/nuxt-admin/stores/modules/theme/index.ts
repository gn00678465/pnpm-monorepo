import {
  ref,
  computed,
  reactive,
  effectScope,
  onScopeDispose,
} from 'vue';
import { defineStore } from 'pinia';
import type { GlobalThemeOverrides } from 'naive-ui';
import { useDarkMode } from './useDarkMode';
import type { AdminLayoutProps } from '@pnpm-monorepo/layouts';
import { createNaiveThemeColors } from '@pnpm-monorepo/naive-ui-extension';
import { createAntdColorPalletteVars } from '@pnpm-monorepo/color'
import { addCssVarsToGlobal } from '@pnpm-monorepo/utility'

export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope();
  const layoutMode = ref<AdminLayoutProps['mode']>('vertical');
  const header = reactive({
    height: 68,
    breadcrumb: {
      visible: true,
      showIcon: true
    }
  });

  /** dark mode */
  const { darkMode, toggleDarkMode } = useDarkMode();

  /** theme */
  const themeColor = reactive({
    primary: '#1677ff',
    info: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  })

  const themeOverridesCommon = computed<GlobalThemeOverrides['common']>(() => ({
    ...createNaiveThemeColors(themeColor, { darkMode: false })
  }))

  onBeforeMount(() => {
    const data = createAntdColorPalletteVars(themeColor, { type: 'nested', theme: 'default' })
    addCssVarsToGlobal(data)
  })

  onScopeDispose(() => {
    scope.stop();
  });

  function setThemeLayout(layout: AdminLayoutProps['mode']) {
    layoutMode.value = layout
  }

  return {
    // dark mode
    darkMode,
    toggleDarkMode,
    // layout
    layoutMode,
    setThemeLayout,
    header,
    // theme
    themeColor,
    themeOverridesCommon
  };
})