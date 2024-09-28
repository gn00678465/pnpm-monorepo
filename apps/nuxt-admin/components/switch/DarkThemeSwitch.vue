<script setup lang="ts">
import { buttonProps } from 'naive-ui';
import MaterialSymbolsHdrAutoRounded from '~icons/material-symbols/hdr-auto-rounded';
import MaterialSymbolsSunnyRounded from '~icons/material-symbols/sunny-rounded';
import MaterialSymbolsDarkModeRounded from '~icons/material-symbols/dark-mode-rounded';
import { CycleIcon } from '@pnpm-monorepo/components'
import { PopoverButton } from '../button';
import { useThemeStore } from '../../stores';

const props = defineProps(buttonProps)
const themeStore = useThemeStore()

</script>

<template>
  <CycleIcon v-model:value="themeStore.themeScheme" :size="20" :tag="PopoverButton" :component-props="props" @next="() => { themeStore.toggleThemeScheme() }">
    <template #icon-auto="_props">
      <MaterialSymbolsHdrAutoRounded class="animate-spin-fade-in" v-bind="_props"/>
    </template>
    <template #icon-light="_props">
      <MaterialSymbolsSunnyRounded class="animate-spin-fade-in" v-bind="_props"/>
    </template>
    <template #icon-dark="_props">
      <MaterialSymbolsDarkModeRounded class="animate-spin-fade-in" v-bind="_props"/>
    </template>
  </CycleIcon>
</template>

<style scoped>

</style>