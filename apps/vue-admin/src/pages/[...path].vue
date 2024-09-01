<script setup lang="ts">
import { definePage } from 'vue-router/auto'

defineOptions({
  name: 'NotFound',
})

definePage({
  name: 'not-found',
  meta: {
    title: 'Page Not Found',
    requiresAuth: false,
    hide: true,
  },
})
</script>

<template>
  <div>404</div>
</template>

<style scoped></style>
