<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminLayout } from '@pnpm-monorepo/layouts'

const appStore = useAppStore()
const { layout, header, footer, fixedHeaderAndTab, sidebar } = storeToRefs(useThemeStore());
</script>

<script lang="ts">
</script>

<template>
  <AdminLayout
    v-model:sidebar-collapse="appStore.sidebarCollapse" class="size-full" sidebar-class="bg-white" header-class="bg-white" content-class=""
    :mode="layout.mode" :is-mobile="appStore.isMobile" :scroll-mode="layout.scrollMode" :header-height="header.height" :fixed-top="fixedHeaderAndTab"
    :footer-visible="footer.visible" :footer-height="footer.height" :fixed-footer="footer.fixed" :right-footer="footer.right" :sidebar-width="sidebar.width" :sidebar-collapsed-width="sidebar.collapsedWidth">
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
