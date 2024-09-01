<script setup lang="ts">
import { RouterView, definePage } from 'vue-router/auto'

defineOptions({
  name: 'AdminDesign',
})

definePage({
  name: 'admin_design',
  meta: {
    title: 'Design',
    requiresAuth: true,
    hide: false,
  },
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

<route lang="yaml">
  meta:
    layout: AdminLayout
  </route>
