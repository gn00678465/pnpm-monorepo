<script setup lang="ts" generic="T extends string = string, Com extends Component = Component">
import { type Component, computed, type PropType, shallowRef, toRefs, toValue, useAttrs, watchEffect } from 'vue'

type InferComponentProps<T> = T extends new () => { $props: infer P } ? P : never

interface SlotProps { width: string, height: string }

type SlotIconTypes = Record<`icon-${T}`, (props: SlotProps) => any>

defineOptions({
  name: 'CycleIcon',
  inheritAttrs: false,
})

const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
  tag: {
    type: [String, Object] as PropType<string | Com>,
    default: 'button',
  },
  componentProps: {
    type: Object as PropType<Partial<InferComponentProps<Com>> & { [key: string]: any }>,
    default: () => ({}),
  },
})
const emits = defineEmits<{
  next: [value: T]
}>()
const slots = defineSlots<SlotIconTypes>()
const attrs = useAttrs()
const [_value] = defineModel<T>('value', { default: undefined })

const { size, tag, componentProps } = toRefs(props)

const listRef = computed<T[]>(() => Object.keys(slots).filter(k => k !== 'default' && k.startsWith('icon-')).map(replaceIcon))
const state = shallowRef<T>(getInitialValue())

const index = computed<number>({
  get() {
    const targetList = listRef.value

    let index = targetList.indexOf(state.value)

    if (index < 0)
      index = 0

    return index
  },
  set(v) {
    set(v)
  },
})

watchEffect(() => {
  state.value = getInitialValue()
})

function getInitialValue() {
  return toValue(_value.value ?? toValue<T[]>(listRef)[0]) ?? undefined
}

function replaceIcon(key: string) {
  return key.replace('icon-', '') as T
}

function set(i: number) {
  const targetList = listRef.value
  const length = targetList.length
  const index = (i % length + length) % length
  const value = targetList[index]
  state.value = value
  _value.value = value
  return value
}

function shift(delta = 1) {
  return set(index.value + delta)
}

function next(n = 1) {
  const state = shift(n)
  emits('next', state)
  return state
}
</script>

<template>
  <tag v-bind="{ ...attrs, ...componentProps }" @click="() => { next() }">
    <template v-for="(key) of listRef" :key="key">
      <slot v-if="state === key" :width="size" :height="size" :name="`icon-${key}`" />
    </template>
  </tag>
</template>

<style scoped>

</style>
