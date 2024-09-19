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
}

const TabPanel = defineComponent({
  name: 'TabPanel',
  props: tabPanelProps,
  emits: ['update:checked'],
  setup(props, { attrs }) {
    const { name, tab } = toRefs(props)

    return { name, tab, attrs }
  },
})

export type TabPanelProps = InstanceType<typeof TabPanel>['$props']

export default TabPanel
</script>

<template>
  <input :id="`radio-${name?.toString()}`" type="radio" name="tabs" v-bind="attrs" :checked="false">
  <label class="tab" v-bind="attrs" :for="`radio-${name?.toString()}`">
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
