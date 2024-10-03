<script lang="ts">
import { defineComponent, type PropType, toRefs, type VNode, type VNodeChild } from 'vue'

export const tabPanelProps = {
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  tab: {
    type: [String, Function, Object] as PropType<string | VNode | (() => VNodeChild)>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

const TabPanel = defineComponent({
  name: 'TabPanel',
  inheritAttrs: false,
  props: tabPanelProps,
  emits: ['update:checked'],
  setup(props, { attrs }) {
    return { attrs, ...toRefs(props) }
  },
})

export type TabPanelProps = InstanceType<typeof TabPanel>['$props']

export default TabPanel
</script>

<template>
  <input :id="`radio-${name?.toString()}`" type="radio" name="tabs" :checked="false" v-bind="attrs">
  <label class="tab" :class="[disabled && 'disabled']" v-bind="attrs" :for="`radio-${name?.toString()}`">
    <template v-if="typeof tab === 'function' || typeof tab === 'object'">
      <component :is="tab" />
    </template>
    <template v-else>
      {{ tab || name }}
    </template>
  </label>
</template>

<style scoped>
input[type="radio"] {
  display: none;
}
</style>
