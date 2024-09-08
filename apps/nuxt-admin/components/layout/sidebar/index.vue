<script setup lang="ts">
import { toRefs } from 'vue';

defineOptions({
  name: 'AdminSidebar',
  inheritAttrs: false
})

const router = useRouter()
const adminRoutes = computed(() => router.options.routes.find((route) => route.path === '/admin')?.children ?? [])
const props = withDefaults(defineProps<LayoutSidebarProps>(), {
  showExtra: true,
  title: 'Admin Dashboard',
  headerHeight: 48
});
const { title, showExtra, headerHeight } = toRefs(props);

const treeMenus = useMenus(adminRoutes)
</script>

<script lang="ts">
export interface LayoutSidebarProps {
  title?: string;
  headerHeight?: number;
  showExtra?: boolean;
}
</script>

<template>
  <div class="size-full flex flex-col items-start justify-start w-full inline-block">
    <NuxtLink to="/" class="w-full flex-center overflow-hidden whitespace-nowrap flex-shrink-0"
      :style="{ height: headerHeight + 'px' }">
      <h2 class="pl-8px text-base font-bold transition duration-300 ease-in-out">
        {{ title }}
      </h2>
    </NuxtLink>
    <LayoutBaseMenu class="flex-grow w-full" :options="treeMenus" />
    <slot v-if="showExtra" name="extra" />
  </div>
</template>

<style scoped></style>