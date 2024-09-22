<template>
  <CycleIcon :value="themeScheme" :size="20" @next="toggleDarkMode">
    <template #icon-auto="props">
      <MaterialSymbolsHdrAutoRounded class="animate-spin-fade-in" v-bind="props"/>
    </template>
    <template #icon-light="props">
      <MaterialSymbolsSunnyRounded class="animate-spin-fade-in" v-bind="props"/>
    </template>
    <template #icon-dark="props">
      <MaterialSymbolsDarkModeRounded class="animate-spin-fade-in" v-bind="props"/>
    </template>
  </CycleIcon>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MaterialSymbolsHdrAutoRounded from '~icons/material-symbols/hdr-auto-rounded';
import MaterialSymbolsSunnyRounded from '~icons/material-symbols/sunny-rounded';
import MaterialSymbolsDarkModeRounded from '~icons/material-symbols/dark-mode-rounded';
import { CycleIcon } from '@pnpm-monorepo/components'
import { useThemeStore } from '../../stores';

const { themeScheme } = storeToRefs(useThemeStore())
const { toggleDarkMode } = useThemeStore()
</script>

<style scoped>

</style>