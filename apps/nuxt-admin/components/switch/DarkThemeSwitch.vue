<script setup lang="ts">
import { ref } from 'vue'
import { buttonProps } from 'naive-ui';
import MaterialSymbolsHdrAutoRounded from '~icons/material-symbols/hdr-auto-rounded';
import MaterialSymbolsSunnyRounded from '~icons/material-symbols/sunny-rounded';
import MaterialSymbolsDarkModeRounded from '~icons/material-symbols/dark-mode-rounded';
import { CycleIcon } from '@pnpm-monorepo/components'
import { PopoverButton } from '../button';
import { useThemeStore } from '../../stores';

const props = defineProps(buttonProps)
const themeStore = useThemeStore()

const switchElement = ref<HTMLDivElement>()

const beforeChange = (callback: () => void | Promise<void> = () => {}) => {
  const isAppearanceTransition =
    !!document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition) {
    callback()
    return
  }
  const rect = switchElement.value?.getBoundingClientRect() || { x: 0, y: 0, width: 0, height: 0 }
  const x = rect.x + rect.width / 2
  const y = rect.y + rect.height / 2

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    callback()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: themeStore.darkMode ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: themeStore.darkMode
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    )
  })
}

function toggle() {
  themeStore.toggleThemeScheme()
  // beforeChange()
}

/**
 *
 */
 declare global {
  interface Document {
    startViewTransition: (updateCallback: () => Promise<void> | void) => ViewTransition
  }

  interface CSSStyleDeclaration {
    viewTransitionName: string
  }

  interface ViewTransition {
    readonly ready: Promise<undefined>
    readonly finished: Promise<undefined>
    readonly updateCallbackDone: Promise<undefined>
    skipTransition: () => void
  }
}


</script>

<template>
  <div ref="switchElement" class="relative">
    <CycleIcon id="dark" v-model:value="themeStore.themeScheme" :size="20" :tag="PopoverButton" :component-props="props" @next="toggle">
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
  </div>
</template>

<style scoped>

</style>