<script setup lang="ts">
import { AdminLayout } from '@pnpm-monorepo/layouts'
</script>

<script lang="ts">
</script>

<template>
  <AdminLayout class="w-full h-full" sidebar-class="bg-white" header-class="bg-white"
    content-class="block flex-1 h-full overflow-x-hidden rounded-2xl pl-0 pr-5 pt-0 pb-6">
    <template #header>
      header
    </template>
    <template #sidebar>
      sidebar
    </template>
    <div class="rounded-2xl bg-[#e8e8e8] p-4">
      <slot />
    </div>
  </AdminLayout>
</template>

<style scoped></style>
