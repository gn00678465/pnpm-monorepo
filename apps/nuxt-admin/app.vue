<script setup lang="ts">
import { NaiveConfigProvider } from '@pnpm-monorepo/naive-ui-extension';
</script>

<template>
  <NuxtLoadingIndicator />
  <NaiveConfigProvider :inline-theme-disabled="false">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfigProvider>
</template>
