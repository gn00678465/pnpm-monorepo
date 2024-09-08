// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  pages: true,
  rootDir: process.cwd(),
  devtools: { enabled: true },
  typescript: {
    typeCheck: false,
    includeWorkspace: true,
    shim: false
  },
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    ['unplugin-icons/nuxt', { autoInstall: true, compiler: 'vue3' }],
    '@pinia-orm/nuxt',
    '@vueuse/nuxt',
    'nuxtjs-naive-ui',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/main.css',
  ],
  unocss: {
    nuxtLayers: true,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  hooks: {
    'pages:extend': function () { },
  },
})