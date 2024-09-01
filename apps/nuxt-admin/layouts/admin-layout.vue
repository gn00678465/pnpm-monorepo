<script setup lang="ts">
import { AdminLayout } from '@pnpm-monorepo/layouts'
</script>

<script lang="ts">
</script>

<template>
  <AdminLayout
    class="w-full h-full" sidebar-class="bg-white" header-class="bg-white"
    style="background-color: #e8e8e8;"
  >
    <template #header>
      header
    </template>
    <template #sidebar>
      sidebar
    </template>
    <slot />
  </AdminLayout>
</template>

<style scoped></style>
