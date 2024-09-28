declare module '#app' {
  interface NuxtApp {
    $treeMenus: import('vue').ComputedRef<import('naive-ui').MenuOption[]>
  }
}

declare module 'nuxt/schema' {
  type AppConfig = Partial<import('./types/theme.type.ts').AppConfig>
}

declare module 'vue-router' {
  interface PageMeta {
    requiresAuth?: boolean;
    title: string;
    icon?: string;
    sort?: number;
    activeMenu?: string;
    hide?: boolean;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export { }