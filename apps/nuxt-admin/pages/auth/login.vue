<script setup lang="ts">
import { NButton } from 'naive-ui';

definePageMeta({
  layout: 'default',
  name: 'AuthLogin',
  keepalive: false,
  alias: ['/login'],
})
</script>

<template>
  <div>
    <p class="header-6 text-32">login</p>
    <br>
    <NButton>NButton</NButton>
    <NButton>NButton</NButton>
    <NButton>NButton</NButton>
  </div>
</template>

<style scoped></style>
