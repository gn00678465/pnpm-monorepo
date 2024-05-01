// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 3010,
    host: '0.0.0.0'
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    'nuxt-typed-router',
    '@vite-pwa/nuxt',
    '@vue-macros/nuxt',
    '@pinia-orm/nuxt',
    '@nuxtjs/eslint-module'
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  pwa: {}
});
