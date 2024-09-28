<script setup lang="ts">
import { toRefs, useAttrs, reactive } from 'vue';
import type { PropType } from 'vue'
import { NButton, NTooltip, buttonProps } from 'naive-ui';
import type { PopoverPlacement } from 'naive-ui';

const props = defineProps({
  ...buttonProps,
  zIndex: {
    type: Number,
    default: 98
  },
  placement: {
    type: String as PropType<PopoverPlacement>,
      default: 'bottom'
  },
  tooltipContent: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
})

const attrs = useAttrs()

const { placement, tooltipContent, zIndex, ..._otherProps } = toRefs(props)
const _buttonProps = reactive(_otherProps)

</script>

<template>
<NTooltip :placement="placement" :z-index="zIndex" :disabled="!tooltipContent">
    <template #trigger>
      <NButton v-bind="{...attrs, ..._buttonProps}">
        <slot/>
      </NButton>
    </template>
    {{ tooltipContent }}
  </NTooltip>
</template>

<style scoped>

</style>