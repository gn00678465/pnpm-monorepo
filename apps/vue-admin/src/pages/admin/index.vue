<script setup lang="ts">
import { definePage } from 'vue-router/auto'

defineOptions({
  name: 'AdminDashboard',
})

definePage({
  name: 'admin_dashboard',
  meta: {
    title: 'Dashboard',
    requiresAuth: true,
    hide: false,
  },
})
</script>

<template>
  <div>
    dashboard
  </div>
</template>

<style scoped></style>

<route lang="yaml">
  meta:
    layout: AdminLayout
  </route>
