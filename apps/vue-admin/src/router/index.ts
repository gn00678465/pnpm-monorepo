import type { App } from 'vue'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

/** Setup Vue Router */
export async function setupRouter (app: App) {
  app.use(DataLoaderPlugin, { router })
  app.use(router)

  await router.isReady()
}

if (import.meta.hot) {
  handleHotUpdate(router)
}
