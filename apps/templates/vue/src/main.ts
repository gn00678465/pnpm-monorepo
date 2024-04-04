import { createApp } from 'vue';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

import App from './App.vue';
import { setupRouter } from './router';
// import { enableMocking } from './mocks';
import type { UserModule } from './types';

async function setupApp() {
  // await enableMocking();

  const app = createApp(App);

  Object.values(
    import.meta.glob<{ install: UserModule }>('./plugins/*.ts', {
      eager: true
    })
  ).forEach((i) => i?.install({ app }));

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
