<script setup lang="ts">
import { NMenu, menuProps } from 'naive-ui'
import { storeToRefs } from 'pinia';
import { getSelectedMenuKeyPath } from '@pnpm-monorepo/naive-ui-extension'

defineOptions({
  name: 'VerticalMenu'
})

const props = defineProps(menuProps)

const route = useRoute()
const { sidebarCollapse } = storeToRefs(useAppStore())
const { sidebar } = storeToRefs(useThemeStore());

const { $treeMenus } = useNuxtApp()

const expandedKeys = ref<string[]>([]);

const selectedKey = computed(() => {
  const { hide, activeMenu } = route.meta;
  const name = route.name as string;

  const routeName = (hide ? activeMenu : name) || name;

  return routeName;
});

function updateExpandedKeys() {
  if (sidebarCollapse.value || !selectedKey.value) {
    expandedKeys.value = [];
    return;
  }
  expandedKeys.value = getSelectedMenuKeyPath(selectedKey, $treeMenus);
}

watch(
  () => route.name,
  () => {
    updateExpandedKeys();
  },
  { immediate: true }
);

</script>

<script lang="ts">

</script>

<template>
  <NMenu
    v-bind="props"
    v-model:expanded-keys="expandedKeys"
    class="w-full flex-grow"
    :collapsed="sidebarCollapse"
    :collapsed-width="sidebar.collapsedWidth"
    :collapsed-icon-size="22"
    mode="vertical"
    :value="selectedKey"
    key-field="key"
    label-field="label"
    :options="$treeMenus"
  />
</template>

<style scoped></style>