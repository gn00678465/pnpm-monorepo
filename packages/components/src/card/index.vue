<script setup lang="ts">
import { computed, type CSSProperties, reactive, toRefs } from 'vue'
import { themeVarsToCssVars } from '../_utility'

const props = withDefaults(defineProps<CardProps>(), {
  inverted: false,
  size: 'md',
  tag: 'div',
  bordered: true,
})
const slots = defineSlots<{
  default: () => any
  header: () => any
  footer: () => any
}>()

const { size, tag, title, bordered, contentClass, contentStyle, headerClass, headerStyle, footerClass, footerStyle, themeOverrides } = toRefs(props)

const showElem = reactive({
  header: computed(() => !!title.value || !!slots.header),
  footer: computed(() => !!slots.footer),
})

const _themeVars = computed(() => Object.assign(themeVars, themeOverrides.value))

const style = computed(() => {
  return {
    '--bezier': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    ...Object.fromEntries(Object.entries(themeVarsToCssVars(size.value, ['sm', 'md', 'lg'], _themeVars.value))),
  }
})
</script>

<script lang="ts">
const themeVars = {
  paddingSm: '12px 16px 12px',
  paddingMd: '19px 24px 20px',
  paddingLg: '23px 32px 24px',
  lineHeight: 1.6,
  fontSizeSm: '14px',
  fontSizeMd: '14px',
  fontSizeLg: '14px',
  titleFontSizeSm: '16px',
  titleFontSizeMd: '18px',
  titleFontSizeLg: '18px',
  borderRadius: '3px',
  color: '#FFF',
  textColor: 'rgb(51, 54, 57)',
  boxShadow: 'inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(190, 190, 190),0.3em 0.3em 1em rgba(0,0,0,0.3)',
  borderColor: 'rgb(239, 239, 245)',
}

type Size = 'sm' | 'md' | 'lg'

export interface CardProps {
  inverted?: boolean
  size?: Size
  tag?: string
  title?: string
  contentClass?: string
  contentStyle?: string | CSSProperties
  bordered?: boolean
  headerClass?: string
  headerStyle?: string | CSSProperties
  footerClass?: string
  footerStyle?: string | CSSProperties
  themeOverrides?: Partial<typeof themeVars>
}
</script>

<template>
  <tag class="card" :class="[bordered && 'card--bordered']" :style="style">
    <div v-if="showElem.header" class="card_header" :class="headerClass" :style="headerStyle" role="heading">
      <slot v-if="!!slots.header" name="header" />
      <template v-else-if="title">
        {{ title }}
      </template>
    </div>
    <div class="card__content" :class="contentClass" :style="contentStyle" role="none">
      <slot />
    </div>
    <div v-if="showElem.footer" class="card__footer" :class="footerClass" :style="footerStyle" role="none">
      <slot name="footer" />
    </div>
  </tag>
</template>

<style scoped>
.card {
  border-radius: var(--border-radius);
  font-size: var(--font-size);
  line-height: var(--line-height);
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  word-break: break-word;
  background-color: var(--color);
  color: var(--text-color);
  transition: border-radius .5s var(--bezier);

  &.card--bordered {
    border: 1px solid var(--border-color);
  }

  .card__header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: var(--title-font-size);
    padding: var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left);
  }
  .card__content,
  .card__footer {
    box-sizing: border-box;
    padding: 0 var(--padding-left) var(--padding-bottom) var(--padding-left);
    font-size: var(--font-size);
    &:first-child {
      padding-top: var(--padding-bottom);
    }
  }
}
</style>
