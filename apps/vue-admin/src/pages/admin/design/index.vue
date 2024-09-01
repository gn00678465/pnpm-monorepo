<script setup lang="ts">
import { definePage } from 'vue-router/auto'

defineOptions({
  name: 'AdminDesignPalette',
})

definePage({
  name: 'admin_design_palette',
  meta: {
    title: 'Design',
    requiresAuth: true,
    hide: false,
  },
})
</script>

<template>
  <div>palette</div>
</template>

<style scoped></style>
