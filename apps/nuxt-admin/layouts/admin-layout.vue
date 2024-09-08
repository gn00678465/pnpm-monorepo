<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminLayout } from '@pnpm-monorepo/layouts'
import { useThemeStore } from '../stores';

const { layoutMode, header } = storeToRefs(useThemeStore());
</script>

<script lang="ts">
</script>

<template>
  <AdminLayout class="size-full" sidebar-class="bg-white" header-class="bg-white" content-class="" :mode="layoutMode"
    :header-height="header.height" common-class="transition-all-300">
    <template #header>
      header
    </template>
    <template #sidebar>
      <LayoutSidebar />
    </template>
    <div class="flex-grow rounded-2xl bg-[#e8e8e8] p-4">
      <slot />
    </div>
  </AdminLayout>
</template>

<style scoped></style>
