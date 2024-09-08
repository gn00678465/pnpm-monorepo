<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useThemeVars, NCard } from 'naive-ui'
import { createReusableTemplate } from '@vueuse/core'
import { getLuminance, createAntdColorPalletteVars } from '@pnpm-monorepo/color'

defineOptions({
  name: 'AdminDesignPalette',
})

definePageMeta({
  name: 'admin_design_pallette',
  title: 'Design Pallette',
  icon: 'material-symbols:palette-outline',
  sort: 1,
})

const themeVars = useThemeVars()
const [DefineColorPaletteTemplate, UseColorPaletteTemplate] = createReusableTemplate<{
  title: string
  primaryName: string
  colors: Record<string, string>
  showPrimary?: boolean
  renderHeaderName?: (name: string) => string
  renderItemName?: (name: string) => string
}>()

const naiveTheme = reactive({
  primaryColor: computed<Record<string, string>>(() => {
    return Object.fromEntries(Object.entries(themeVars.value).filter(([key]) => /primaryColor/i.test(key)))
  }),
  infoColor: computed<Record<string, string>>(() => {
    return Object.fromEntries(Object.entries(themeVars.value).filter(([key]) => /infoColor/i.test(key)))
  }),
  warningColor: computed<Record<string, string>>(() => {
    return Object.fromEntries(Object.entries(themeVars.value).filter(([key]) => /warningColor/i.test(key)))
  }),
  successColor: computed<Record<string, string>>(() => {
    return Object.fromEntries(Object.entries(themeVars.value).filter(([key]) => /successColor/i.test(key)))
  }),
  errorColor: computed<Record<string, string>>(() => {
    return Object.fromEntries(Object.entries(themeVars.value).filter(([key]) => /errorColor/i.test(key)))
  }),
})

const unocssTheme = computed(() => {
  return createAntdColorPalletteVars({
    primary: themeVars.value.primaryColor,
    info: themeVars.value.infoColor,
    warning: themeVars.value.warningColor,
    success: themeVars.value.successColor,
    error: themeVars.value.errorColor,
  }, { type: 'nested' })
})

/**
 * Generates a contrasting text color based on the background color's luminance.
 *
 * @param {string} background - The background color in hexadecimal format.
 * @returns {string} Returns either "black" or "white" as the contrasting text color.
 */
function getContrastingColor(background: string): string {
  const luminance = getLuminance(background);
  const threshold = 0.4;
  return luminance > threshold ? "black" : "white";
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <DefineColorPaletteTemplate v-slot="{ title, primaryName, colors, showPrimary, renderItemName, renderHeaderName }">
      <ul class="color-palette group">
        <li class="color-palette__header"
          :style="{ backgroundColor: colors[primaryName], color: getContrastingColor(colors[primaryName]) }">
          <p class="color-palette__header-title">{{ title }}</p>
          <p class="color-palette__header-value">
            <span class="color-palette__header-value-name">
              {{ renderHeaderName ? renderHeaderName(primaryName) : primaryName }}
            </span>
            <span
              class="color-palette__header-value-color opacity-0 transition-opacity duration-300 group-hover:opacity-100">{{
      colors[primaryName]?.toUpperCase() }}</span>
          </p>
        </li>
        <template v-for="(value, key) of colors" :key="key">
          <li v-if="key !== primaryName || showPrimary" class="color-palette__item"
            :style="`background-color: ${value};  color: ${getContrastingColor(value)}`">
            <p class="color-palette__item-label">{{ renderItemName ? renderItemName(key) : key }}</p>
            <p class="color-palette__item-value opacity-0 transition-opacity duration-300 group-hover:opacity-100">{{
      value }}</p>
          </li>
        </template>

      </ul>
    </DefineColorPaletteTemplate>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-5">
      <NCard v-for="(val, key) of naiveTheme" :key="key" :theme-overrides="{ borderRadius: '1rem' }">
        <UseColorPaletteTemplate :title="key.replace('Color', '')" :primary-name="key" :colors="val" />
      </NCard>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-5">
      <NCard v-for="(val, key) of unocssTheme" :key="key" :theme-overrides="{ borderRadius: '1rem' }">
        <UseColorPaletteTemplate :title="key" primary-name="6" :show-primary="true" :colors="val"
          :render-header-name="(n) => `${key}`" :render-item-name="(n) => n === '6' ? `${key}` : `${key}-${n}`" />
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.color-palette {
  cursor: pointer;
  font-size: .875rem;
  line-height: 1.25rem;
}

.color-palette__header {
  height: 6rem;
  border-radius: .25rem;
  padding: 1rem;
  --un-text-opacity: 1;
  color: rgb(246 246 246 / var(--un-text-opacity));
  font-weight: 600;
  transition-property: all;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;

  &:hover {
    --un-scale-x: 1.05;
    --un-scale-y: 1.05;
    transform: translate(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotate(var(--un-rotate-z)) skew(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));
  }
}


.color-palette__header-title {
  margin-bottom: 1rem;
  padding-left: .25rem;
  padding-right: .25rem;
}

.color-palette__header-value {
  display: flex;
  justify-content: space-between;
  padding-left: .25rem;
  padding-right: .25rem;
  font-weight: 400;
}

.color-palette__header-value-name .color-palette__header-value-color {
  font-weight: 400;
}

.color-palette__item {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: .25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-weight: 400;
  transition-property: all;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;

  &:hover {
    --un-scale-x: 1.05;
    --un-scale-y: 1.05;
    transform: translate(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotate(var(--un-rotate-z)) skew(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));
  }
}


.color-palette__item-label,
.color-palette__item-value {
  transition-property: all;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;
}
</style>
