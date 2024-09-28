

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { CycleIcon } from '@pnpm-monorepo/components'
import MaterialSymbolsFullscreenRounded from '~icons/material-symbols/fullscreen-rounded'
import MaterialSymbolsFullscreenExitRounded from '~icons/material-symbols/fullscreen-exit-rounded'
import { PopoverButton } from '../button';

const { isFullscreen, enter, exit } = useFullscreen()

const computedFull = computed({
  get: () => isFullscreen.value ? 'fullscreen' : 'fullscreen-exit',
  set: (str) => {
    if (str === 'fullscreen') {
      enter()
    }
    if (str === 'fullscreen-exit') {
      exit()
    }
  }
})

</script>

<template>
  <CycleIcon v-model:value="computedFull" :size="20" :tag="PopoverButton" :component-props="{ quaternary: true, tooltipContent: 'Fullscreen' }">
    <template #icon-fullscreen-exit="props">
      <MaterialSymbolsFullscreenExitRounded class="animate-pop-in" v-bind="props"/>
    </template>
    <template #icon-fullscreen="props">
      <MaterialSymbolsFullscreenRounded class="animate-pop-in" v-bind="props"/>
    </template>
  </CycleIcon>
</template>

<style scoped>

</style>