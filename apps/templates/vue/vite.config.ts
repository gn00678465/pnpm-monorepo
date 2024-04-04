import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros/vite';
import VueRouter from 'unplugin-vue-router/vite';
import Layouts from 'vite-plugin-vue-layouts';
import VueDevTools from 'vite-plugin-vue-devtools';
import WebfontDownload from 'vite-plugin-webfont-dl';
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`
    }
  },

  server: {
    host: '0.0.0.0'
  },

  plugins: [
    // https://uvr.esm.is/guide/configuration.html
    VueRouter({
      root: __dirname,
      dts: 'src/typed-router.d.ts'
    }),

    // https://vue-macros.dev/guide/configurations.html
    VueMacros({
      root: __dirname,
      plugins: {
        vue: vue()
      }
    }),

    // https://github.com/johncampionjr/vite-plugin-vue-layouts?tab=readme-ov-file#configuration
    Layouts({
      layoutsDirs: resolve(__dirname, 'src/layouts'),
      pagesDirs: resolve(__dirname, 'src/pages'),
      defaultLayout: 'default'
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    WebfontDownload(),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools()
  ]
});
