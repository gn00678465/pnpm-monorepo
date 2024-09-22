<script lang="ts">
import { computed, defineComponent, type PropType, ref, type RendererElement, type RendererNode, toRefs, type VNode, watch } from 'vue'
import { themeVarsToCssVars } from '../_utility'
import TabPanel, { type TabPanelProps } from './TabPanel.vue'

type Size = 'sm' | 'md' | 'lg'

const themeVars = {
  paddingSm: '4px',
  paddingMd: '6px',
  paddingLg: '8px',
  fontSizeSm: '14px',
  fontSizeMd: '14px',
  fontSizeLg: '14px',
  borderRadius: '4px',
  textColor: 'rgb(51, 54, 57)',
  gliderColor: '#FFF',
  backgroundColor: 'rgb(247, 247, 250)',
  darkTextColor: '#FFF',
  darkGliderColor: 'rgba(255, 255, 255, 0.1)',
  darkBackgroundColor: 'rgba(255, 255, 255, 0.1)',
}

export const tabsProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  themeOverrides: {
    type: Object as PropType<typeof themeVars>,
    default: () => ({}),
  },
}

export default defineComponent({
  name: 'Tabs',
  props: tabsProps,
  emits: {
    'update:value': (value: string | number) => !!value,
  },
  setup(props, ctx) {
    const { size, themeOverrides } = toRefs(props)

    const panels = computed<VNode<RendererNode, RendererElement, TabPanelProps>[]>(() => (ctx.slots.default?.() ?? []).filter(panel => panel.type === TabPanel))
    const panelNames = computed(() => panels.value.map(panel => panel.props?.name).filter(Boolean) as (string | number)[])

    const currentIndex = ref(0)
    const style = computed(() => ({
      '--bezier': 'ease-in-out',
      '--font-weight': 400,
      '--font-weight-active': 400,
      '--gap': '0px',
      ...themeVarsToCssVars(size.value, ['sm', 'md', 'lg'], Object.assign(themeVars, themeOverrides.value)),
    }))

    if (props.value && panelNames.value.includes(props.value)) {
      currentIndex.value = panelNames.value.findIndex(n => n === props.value) || 0
    }

    watch(currentIndex, (_) => {
      ctx.emit('update:value', panelNames.value[_])
    }, { immediate: true })

    return {
      panels,
      currentIndex,
      style,
    }
  },
})
</script>

<template>
  <div class="tabs" :style="style">
    <template v-for="(panel, idx) of panels" :key="idx">
      <component :is="panel" :style="currentIndex === idx && `font-weight: var(--font-weight-active)`" @click="() => { currentIndex = idx }" />
    </template>
    <span class="glider" :style="`transform: translateX(${currentIndex * 100}%);`" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: var(--gap);
  position: relative;
  background-color: light-dark(var(--background-color), var(--dark-background-color));
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size);
  line-height: 1.5;
  letter-spacing: 0.02em;
  box-sizing: border-box;
  font-weight: var(--font-weight);

  .glider {
    position: absolute;
    display: flex;
    height: calc(100% - 8px);
    width: calc((100% - 8px) / v-bind('panels.length'));
    background-color: light-dark(var(--glider-color), var(--dark-glider-color));
    z-index: 1;
    border-radius: var(--border-radius);
    transition: all 0.25s var(--bezier);
  }
}

.tabs * {
  z-index: 2;
}

:deep(.tab) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  padding: var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left);
  color: light-dark(var(--text-color), var(--dark-text-color));
  font-weight: 500;
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  transition: color 0.15s var(--bezier);
  user-select: none;
}
</style>
