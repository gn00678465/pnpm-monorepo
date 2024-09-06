<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useThemeVars, type GlobalThemeOverrides } from 'naive-ui';
import { NaiveConfigProvider, createNaiveThemeColors } from '@pnpm-monorepo/naive-ui-extension';
import { createAntdColorPalletteVars } from '@pnpm-monorepo/color'
import { addCssVarsToGlobal } from '@pnpm-monorepo/utility'

const themeColor = {
  primary: '#646CFF',
  info: '#646CFF',
  success: '#52C41A',
  warning: '#FAAD14',
  error: '#F5222D'
}

const themeVars = useThemeVars();
const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    fontFamily: `'Noto Sans TC', 'Roboto', ${themeVars.value.fontFamily}`,
    fontFamilyMono: `'Fira Code', 'Fira Mono', ${themeVars.value.fontFamilyMono}`,
    ...createNaiveThemeColors(themeColor, false)
  }
}))

onBeforeMount(() => {
  const data = createAntdColorPalletteVars(themeColor, { type: 'nested' })
  addCssVarsToGlobal(data)
})

</script>

<template>
  <NuxtLoadingIndicator />
  <NaiveConfigProvider :inline-theme-disabled="false" class="size-full" :theme-overrides="themeOverrides">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfigProvider>
</template>
