<script lang="ts">
import { computed, defineComponent, type PropType, ref, type RendererElement, type RendererNode, type VNode, watch } from 'vue'

import TabPanel, { type TabPanelProps } from './TabPanel.vue'

export const tabsProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  backgroundColor: {
    type: String,
    default: 'rgb(247, 247, 250)',
  },
}

export default defineComponent({
  name: 'Tabs',
  props: tabsProps,
  emits: {
    'update:value': (value: string | number) => !!value,
  },
  setup(props, ctx) {
    const panels = computed<VNode<RendererNode, RendererElement, TabPanelProps>[]>(() => (ctx.slots.default?.() ?? []).filter(panel => panel.type === TabPanel))
    const panelNames = computed(() => panels.value.map(panel => panel.props?.name).filter(Boolean) as (string | number)[])

    const currentIndex = ref(0)
    const style = computed(() => ({
      '--tab-padding': props.size === 'md' ? '6px 0' : props.size === 'lg' ? '8px 0' : props.size === 'sm' ? '4px 0' : '6px 0',
      '--tab-font-size': '14px',
      '--tab-bg-color': props.backgroundColor,
      '--tab-glider-color': '#FFF',
      '--tab-font-weight': 400,
      '--tab-font-weight-active': 400,
      '--tab-border-radius': '0.25rem',
      '--tab-gap': '0px',
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
      <component :is="panel" :style="currentIndex === idx && `font-weight: var(--tab-font-weight-active)`" @click="() => { currentIndex = idx }" />
    </template>
    <span class="glider" :style="`transform: translateX(${currentIndex * 100}%);`" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: var(--tab-gap);
  position: relative;
  background-color: var(--tab-bg-color);
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  border-radius: var(--tab-border-radius);
  font-size: var(--tab-font-size);
  line-height: 1.5;
  letter-spacing: 0.02em;
  box-sizing: border-box;
  font-weight: var(--tab-font-weight);

  .glider {
    position: absolute;
    display: flex;
    height: calc(100% - 8px);
    width: calc((100% - 8px) / v-bind('panels.length'));
    background-color: var(--tab-glider-color);
    z-index: 1;
    border-radius: var(--tab-border-radius);
    transition: 0.25s ease-out;
  }
}

.tabs * {
  z-index: 2;
}

:deep(.tab) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--tab-padding);
  flex: 1 1 auto;
  color: black;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease-in;
  user-select: none;
}
</style>
