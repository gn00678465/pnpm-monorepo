<script setup lang="ts">
import {
  configProviderProps,
  type MessageProviderProps,
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  type NotificationProviderProps,
  useMessage,
  useNotification,
} from 'naive-ui'
import { defineComponent, h, onMounted, type PropType, toRefs } from 'vue'

const props = defineProps({
  ...configProviderProps,
  messageProps: {
    type: Object as PropType<MessageProviderProps>,
    default: () => ({}),
  },
  notificationProps: {
    type: Object as PropType<NotificationProviderProps>,
    default: () => ({}),
  },
})

const Content = defineComponent({
  name: 'NaiveContentProvider',
  setup() {
    onMounted(() => {
      window.$message = useMessage()
      window.$notification = useNotification()
    })

    return () => h('div')
  },
})

const { messageProps, notificationProps } = toRefs(props)
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
    <NNotificationProvider v-bind="notificationProps">
      <NMessageProvider v-bind="messageProps">
        <slot />
        <Content />
      </NMessageProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<style scoped></style>
