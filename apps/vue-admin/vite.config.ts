import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: true,
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      routesFolder: [
        {
          src: 'src/pages',
          path: '',
          // override globals
          exclude: excluded => excluded,
          filePatterns: filePatterns => filePatterns,
          extensions: extensions => extensions,
        },
      ],
    }),

    vue(),

    // https://github.com/johncampionjr/vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages',
    }),

    // https://github.com/unplugin/unplugin-icons/tree/main
    Icons({
      compiler: 'vue3',
    }),

    UnoCSS(),

    // https://devtools-next.vuejs.org/getting-started/introduction
    vueDevTools({ launchEditor: 'code' }),
  ],
})
