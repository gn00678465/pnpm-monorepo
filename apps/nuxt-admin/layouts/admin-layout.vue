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
    v-model:sidebar-collapse="appStore.sidebarCollapse" class="size-full" sidebar-class="bg-white dark:bg-midnight-blue" header-class="bg-white dark:bg-midnight-blue" content-class="dark:bg-midnight-blue" :mode="layout.mode" :is-mobile="appStore.isMobile" :scroll-mode="layout.scrollMode" :header-height="header.height" :fixed-top="fixedHeaderAndTab" :footer-visible="footer.visible" :footer-height="footer.height" :fixed-footer="footer.fixed" :right-footer="footer.right"
    :sidebar-width="sidebar.width" :sidebar-collapsed-width="sidebar.collapsedWidth">
    <template #header>
      <LazyLayoutHeader />
    </template>
    <template #sidebar>
      <LayoutSidebar />
    </template>
    <div class="flex-grow rounded-2xl bg-[var(--body-bg)] dark:bg-[var(--body-bg)] p-4">
      <slot />
    </div>
  </AdminLayout>
</template>

<style scoped></style>
