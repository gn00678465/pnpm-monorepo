declare module '#app' {
  interface NuxtApp {
    $treeMenus: import('vue').ComputedRef<import('naive-ui').MenuOption[]>
  }
}

declare module 'nuxt/schema' {
  interface AppConfig {
    /** Theme configuration */
    theme: {
      primary?: string
      info?: string
      success?: string
      warning?: string
      error?: string
    }
    layout: Partial<import('./types/theme.type').ThemeLayout>
    header: Partial<import('./types/theme.type').ThemeHeader>
    sidebar: Partial<import('./types/theme.type').ThemeSidebar>
    foobar: Partial<import('./types/theme.type').ThemeFooter>
  }
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