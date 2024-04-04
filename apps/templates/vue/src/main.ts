import { createApp } from 'vue';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

import App from './App.vue';
import { setupRouter, router } from './router';
import { enableMocking } from './mocks/index';
import type { UserModule } from './types';

async function setupApp() {
  // mock data by msw
  await enableMocking();

  const app = createApp(App);

  // install all plugins under `plugins/`
  Object.values(
    import.meta.glob<{ install: UserModule }>('./plugins/*.ts', {
      eager: true
    })
  ).forEach((i) => i?.install({ app, router }));

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
