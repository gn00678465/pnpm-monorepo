import antfu from '@antfu/eslint-config'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import eslintConfigBase from '../../eslint.config.base.mjs'

export default antfu(
  {
    vue: true,
    unocss: true,
    typescript: true,
    formatters: true,
    jsonc: false,
    name: 'vue-admin',
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
      'vue': pluginVue,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
    },
  },
  ...eslintConfigBase,
  // Vue 推薦設定
  ...pluginVue.configs['flat/essential'],
  // 對 Vue 文件使用特定的解析器
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: ['**/dist', '**/node_modules'],
    settings: {
      'import/core-modules': ['vue-router/auto-routes'],
    },
  },
).renamePlugins({
  stylistic: '@stylistic',
})
