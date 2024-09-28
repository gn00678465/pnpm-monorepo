<script setup lang="ts">
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import VerticalMenu from './modules/vertical-menu.vue';

defineOptions({
  name: 'AdminSidebar',
  inheritAttrs: false
})

const props = withDefaults(defineProps<LayoutSidebarProps>(), {
  showExtra: true,
  title: 'Admin Dashboard',
  headerHeight: 48
});
const { title, showExtra, headerHeight } = toRefs(props);
const { layout } = storeToRefs(useThemeStore());

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
      <h2 class="pl-8px text-base font-bold transition duration-300 ease-in-out text-primary">
        {{ title }}
      </h2>
    </NuxtLink>
    <VerticalMenu :mode="layout.mode" />
    <slot v-if="showExtra" name="extra" />
  </div>
</template>

<style scoped></style>