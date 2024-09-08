declare global {
  const process: NodeJS.Process;
  namespace NodeJS {
    interface ProcessEnv {
      readonly COOKIE_TOKEN_NAME: string;
      readonly BASE_URL: string;
    }
  }
}

declare module 'vue-router' {
  interface PageMeta {
    requiresAuth: boolean;
    title: string;
    icon?: string;
    sort?: number;
    activeMenu?: string;
    hide?: boolean;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export { }