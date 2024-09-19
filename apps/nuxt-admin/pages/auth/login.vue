<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabPanel, Card } from '@pnpm-monorepo/components'

definePageMeta({
  layout: 'default',
  name: 'AuthLogin',
  keepalive: false,
  alias: ['/login'],
})

const selectTab = ref('login')
</script>

<template>
  <div class="size-full relative flex-center">
    <div class="w-120">
      <Card class="relative" size="md" :theme-overrides="{ borderRadius: '10px' }">
        <Tabs v-model:value="selectTab">
          <TabPanel name="register" tab="Register" />
          <TabPanel name="login" tab="Login" />
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<style scoped>


</style>
