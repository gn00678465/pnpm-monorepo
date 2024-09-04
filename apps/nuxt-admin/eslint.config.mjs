import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import antfu from '@antfu/eslint-config'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import eslintConfigBase from '../../eslint.config.base.mjs'

export default createConfigForNuxt(antfu(
  {
    vue: true,
    unocss: true,
    typescript: true,
    formatters: true,
    jsonc: false,
    name: 'nuxt-admin',
  },
  ...eslintConfigBase,
  // Vue 推薦設定
  ...pluginVue.configs['flat/essential'],
  // 對 Vue 文件使用特定的解析器
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'vue': pluginVue,
    },
    rules: {
      'no-unused-vars': 'warn',
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
    },
  },
  {
    ignores: ['**/dist', '**/node_modules'],
  },
)).renamePlugins({
  stylistic: '@stylistic',
}).overrideRules({
  "vue/first-attribute-linebreak": 'off',
})
