<script lang="ts">
</script>

<script setup lang="ts">
import { AdminLayout } from '@pnpm-monorepo/layouts'
import { RouterView, useRouter } from 'vue-router/auto'

defineOptions({
  name: 'AdminLayout',
  inheritAttrs: false,
})

const router = useRouter()
</script>

<template>
  <AdminLayout>
    <template #sidebar>
      <a href="" @click.prevent="router.push({ name: 'admin_dashboard' })">index</a>
      <br>
      <a href="" @click.prevent="router.push({ name: 'admin_design_palette' })">design</a>
    </template>
    <RouterView />
  </AdminLayout>
</template>

<style scoped></style>
