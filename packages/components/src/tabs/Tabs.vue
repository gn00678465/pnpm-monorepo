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
    type: Object as PropType<Partial<typeof themeVars>>,
    default: () => ({}),
  },
}

export default defineComponent({
  name: 'Tabs',
  inheritAttrs: false,
  props: tabsProps,
  emits: {
    'update:value': (value: string | number) => !!value,
  },
  setup(props, ctx) {
    const { size, themeOverrides } = toRefs(props)

    const panels = computed<VNode<RendererNode, RendererElement, TabPanelProps>[]>(() => (ctx.slots.default?.() ?? []).filter(panel => panel.type === TabPanel))
    const panelNames = computed(() => panels.value.filter(panel => !panel.props?.disabled).map(panel => panel.props?.name).filter(Boolean) as (string | number)[])

    const _themeVars = computed(() => Object.assign(themeVars, themeOverrides.value))

    const currentIndex = ref(0)
    const style = computed(() => ({
      '--bezier': 'ease-in-out',
      '--font-weight': 400,
      '--font-weight-active': 500,
      '--gap': '0px',
      ...themeVarsToCssVars(size.value, ['sm', 'md', 'lg'], _themeVars.value),
    }))

    if (props.value && panelNames.value.includes(props.value)) {
      currentIndex.value = panelNames.value.findIndex(n => n === props.value) || 0
    }

    watch(currentIndex, (_) => {
      ctx.emit('update:value', panelNames.value[_])
    }, { immediate: true })

    function onClick(idx: number, panel: VNode<RendererNode, RendererElement, TabPanelProps>) {
      if (panel.props?.disabled)
        return
      currentIndex.value = idx
    }

    return {
      panels,
      currentIndex,
      style,
      onClick,
    }
  },
})
</script>

<template>
  <div class="tabs" role="tablist" :style="{ ...style, gridTemplateColumns: `repeat(${panels.length}, minmax(0, 1fr))` }">
    <template v-for="(panel, idx) of panels" :key="idx">
      <component :is="panel" role="tab" :aria-selected="currentIndex === idx" @click="() => { onClick(idx, panel) }" />
    </template>
    <span class="glider" :style="`transform: translateX(${currentIndex * 100}%);`" />
  </div>
</template>

<style scoped>
.tabs {
  display: grid;
  gap: var(--gap);
  position: relative;
  background-color: var(--background-color);
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size);
  line-height: 1.5;
  letter-spacing: 0.02em;
  box-sizing: border-box;
  font-weight: var(--font-weight);

  .glider {
    --padding-x: 4px;
    --padding-y: 3px;
    position: absolute;
    left: var(--padding-x);
    top: var(--padding-y);
    display: flex;
    width: calc((100% - calc(var(--padding-x) * 2)) / v-bind('panels.length'));
    height: calc(100% - calc(var(--padding-y) * 2));
    background-color: var(--glider-color);
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
  padding: var(--padding-top) var(--padding-left) var(--padding-bottom) var(--padding-left);
  color: var(--text-color);
  font-weight: 500;
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  transition: all 0.15s var(--bezier);
  -webkit-user-select: none;
  user-select: none;
  &.disabled {
    cursor: not-allowed;
  }
  &[aria-selected='true'] {
    font-weight: var(--font-weight-active);
  }
}
</style>
