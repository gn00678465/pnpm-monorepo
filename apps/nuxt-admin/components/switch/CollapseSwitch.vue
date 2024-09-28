<script setup lang="ts">
import { CycleIcon } from '@pnpm-monorepo/components'
import MdiHamburgerClose from '~icons/mdi/hamburger-close'
import MdiHamburgerOpen from '~icons/mdi/hamburger-open'
import { useAppStore } from '../../stores';
import { PopoverButton } from '../button';

const { toggleSidebarCollapse } = useAppStore()

</script>

<template>
  <CycleIcon :size="22" :tag="PopoverButton" :component-props="{ quaternary: true }" @next="() => { toggleSidebarCollapse() }">
    <template #icon-open="props">
      <MdiHamburgerOpen class="animate-pop-in" v-bind="props"/>
    </template>
    <template #icon-close="props">
      <MdiHamburgerClose class="animate-pop-in" v-bind="props"/>
    </template>
  </CycleIcon>
</template>

<style scoped>

</style>