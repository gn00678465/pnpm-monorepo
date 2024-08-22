import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

import { routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

/** Setup Vue Router */
export async function setupRouter (app: App) {
  app.use(router)

  await router.isReady()
}
