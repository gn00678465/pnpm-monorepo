<script setup lang="ts">
definePageMeta({
  layout: false,
  name: 'IndexPage',
  keepalive: false,
  redirect: () => ({ name: 'AuthLogin' }),
})
</script>

<template>
  <div>
    index
  </div>
</template>

<style scoped></style>
