import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
import './style.css'
import App from './app/App.vue'
import { router, setupRouter } from './router'
import type { UserModule } from './types'

function main () {
  const app = createApp(App)

  // install all plugins under `plugins/`
  Object.values(
    import.meta.glob<{ install: UserModule }>('./plugins/*.ts', {
      eager: true,
    }),
  ).forEach(i => i?.install({ app, router }))

  /** setup router */
  setupRouter(app)

  app.mount('#app')
}

main()
