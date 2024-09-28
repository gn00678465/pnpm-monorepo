<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { Tabs, TabPanel, Card } from '@pnpm-monorepo/components'
import { DarkThemeSwitch } from "../../components/switch"

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
    <div class="w-102 relative">
      <Card class="relative !dark:bg-outer-space !dark:border-[#3d3c3c]" size="lg" content-class="space-y-6" :theme-overrides="{ borderRadius: '10px' }">
        <div class="text-center">
          <p class="title !dark:text-white">
            <template v-if="selectTab === 'login'">Login to your Account</template>
            <template v-if="selectTab === 'register'">Register a new Account</template>
          </p>
          <span class="subtitle !dark:text-white">Get started with our app, just create an account and enjoy the experience.</span>
        </div>
        <Tabs v-model:value="selectTab">
          <TabPanel name="register" tab="Register" />
          <TabPanel name="login" tab="Login" />
        </Tabs>
        <NForm size='large'>
          <NFormItem label="Account"><NInput/></NFormItem>
          <NFormItem label="Password"><NInput/></NFormItem>
          <NFormItem  :show-feedback="false" :show-label="false">
            <NButton block type="primary">Submit</NButton>
          </NFormItem>
        </NForm>
      </Card>
      <DarkThemeSwitch class="!absolute top-5 left-5" text/>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
}

.subtitle {
  font-size: 0.725rem;
  max-width: 80%;
  text-align: center;
  line-height: 1.1rem;
  color: #8B8E98
}

</style>
