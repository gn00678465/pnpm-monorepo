<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeVars, type GlobalThemeOverrides } from 'naive-ui';
import { NaiveConfigProvider } from '@pnpm-monorepo/naive-ui-extension';
import { useThemeStore } from './stores';

const { themeOverridesCommon } = storeToRefs(useThemeStore())

const themeVars = useThemeVars();
const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    fontFamily: `'Noto Sans TC', 'Roboto', ${themeVars.value.fontFamily}`,
    fontFamilyMono: `'Fira Code', 'Fira Mono', ${themeVars.value.fontFamilyMono}`,
    ...themeOverridesCommon.value
  }
}))


</script>

<template>
  <NuxtLoadingIndicator />
  <ClientOnly>
    <NaiveConfigProvider :inline-theme-disabled="false" class="size-full" :theme-overrides="themeOverrides">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NaiveConfigProvider>
  </ClientOnly>
</template>
