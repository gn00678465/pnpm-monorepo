<script setup lang="ts" generic="T extends string = string">
import { computed, shallowRef, toRefs, toValue } from 'vue'

interface SlotProps { width: string, height: string }

type SlotIconTypes = Record<`icon-${T}`, (props: SlotProps) => any>

const props = withDefaults(defineProps<CycleIconProps>(), {
  size: 16,
})

const emits = defineEmits<{
  next: []
}>()

const slots = defineSlots<SlotIconTypes>()

const [_value] = defineModel<T>('value', { default: undefined })

const { size } = toRefs(props)

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
  emits('next')
  return shift(n)
}
</script>

<script lang="ts">
interface CycleIconProps {
  size?: number
}
</script>

<template>
  <button @click="() => { next() }">
    <template v-for="(key) of listRef" :key="key">
      <slot v-if="state === key" :width="size" :height="size" :name="`icon-${key}`" />
    </template>
  </button>
</template>

<style scoped>

</style>
