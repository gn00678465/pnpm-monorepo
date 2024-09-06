<script setup lang="ts">
import { type PropType, defineComponent, h, toRefs } from 'vue'
import {
  type MessageProviderProps,
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  configProviderProps,
} from 'naive-ui'

const props = defineProps({
  ...configProviderProps,
  messageProps: {
    type: Object as PropType<MessageProviderProps>,
    default: () => ({}),
  },
})

const Content = defineComponent({
  name: 'NaiveContentProvider',
  setup(props) {
    return () => h('div')
  },
})

const { messageProps } = toRefs(props)
</script>

<script lang="ts">
declare global {
  interface Window {
    $message: import('naive-ui').MessageApi
    $notification: import('naive-ui').NotificationApi
  }
}
</script>

<template>
  <NConfigProvider v-bind="props">
    <NNotificationProvider>
      <NMessageProvider v-bind="messageProps">
        <slot />
        <Content />
      </NMessageProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<style scoped></style>
