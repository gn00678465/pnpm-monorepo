<script setup lang="ts">
import { definePage } from 'vue-router/auto'

defineOptions({
  name: 'ClientIndex',
})

definePage({
  name: 'index',
  meta: {
    title: 'Index Page',
    requiresAuth: false,
    hide: false,
  },
})
</script>

<template>
  <div>
    index
  </div>
</template>

<style scoped></style>
