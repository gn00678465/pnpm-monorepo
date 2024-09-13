import { effectScope, onScopeDispose, watch } from 'vue';
import { defineStore } from 'pinia';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { useBoolean } from "@pnpm-monorepo/utility"
import { useThemeStore } from '../theme';

export const useAppStore = defineStore('app-store', () => {
  const themeStore = useThemeStore()

  const { bool: sidebarCollapse, setBool: setSidebarCollapse, toggle: toggleSidebarCollapse } = useBoolean();

  const scope = effectScope();
  const breakpoints = useBreakpoints(breakpointsTailwind);

  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm');


  scope.run(() => {
    // watch isMobile, if is mobile, collapse sider
    watch(
      isMobile,
      newValue => {
        if (newValue) {
          themeStore.setThemeLayout('vertical');
          setSidebarCollapse(true);
        }
      },
      { immediate: true }
    );
  })

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop();
  });

  return {
    isMobile,
    sidebarCollapse,
    setSidebarCollapse,
    toggleSidebarCollapse
  }
})