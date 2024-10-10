<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeVars, darkTheme, type GlobalThemeOverrides } from 'naive-ui';
import { NaiveConfigProvider } from '@pnpm-monorepo/naive-ui-extension';
import { useThemeStore } from './stores';

const { darkMode, lightThemeOverrideCommon, darkThemeOverrideCommon } = storeToRefs(useThemeStore())

const appConfig = useAppConfig()
const themeVars = useThemeVars()
const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    fontFamily: `'Noto Sans TC', 'Roboto', ${themeVars.value.fontFamily}`,
    fontFamilyMono: `'Fira Code', 'Fira Mono', ${themeVars.value.fontFamilyMono}`,
    ...(darkMode.value ? darkThemeOverrideCommon.value : lightThemeOverrideCommon.value)
  }
}))

</script>

<template>
  <NuxtLoadingIndicator />
  <ClientOnly>
    <NaiveConfigProvider :inline-theme-disabled="false" class="size-full" :theme="darkMode ? darkTheme : undefined" :theme-overrides="themeOverrides"
    :breakpoints="appConfig.breakpoints">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NaiveConfigProvider>
  </ClientOnly>
</template>
