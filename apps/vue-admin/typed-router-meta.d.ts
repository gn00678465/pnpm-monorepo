import 'vue-router'

export { }

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    title?: string
    icon?: string
    hide?: boolean
  }
}
