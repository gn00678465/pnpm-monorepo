<script setup lang="ts">
import { NMenu, menuProps } from 'naive-ui'

defineOptions({
  name: 'BaseMenu'
})

const props = defineProps(menuProps)

const route = useRoute()

const expandedKeys = ref<string[]>([]);

const selectedKey = computed(() => {
  const { hide, activeMenu } = route.meta;
  const name = route.name as string;

  const routeName = (hide ? activeMenu : name) || name;

  return routeName;
});

// function updateExpandedKeys() {
//   if (isHorizontal.value || siderCollapse.value || !selectedKey.value) {
//     expandedKeys.value = [];
//     return;
//   }
//   expandedKeys.value = getSelectedMenuKeyPath(
//     selectedKey.value,
//     treeMenus.value
//   );
// }

// watch(
//   () => route.name,
//   () => {
//     updateExpandedKeys();
//   },
//   { immediate: true }
// );

// function handleClickMenu(key: string) {
//   console.log("🚀 ~ handleClickMenu ~ key:", key)
// }

</script>

<script lang="ts">

</script>

<template>
  <NMenu v-model:expanded-keys="expandedKeys" :value="selectedKey" v-bind="props" key-field="key" label-field="label" />
</template>

<style scoped></style>