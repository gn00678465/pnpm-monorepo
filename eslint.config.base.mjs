import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  // JavaScript 推薦設定
  {
    ...pluginJs.configs.recommended,
  },
  // TypeScript 推薦設定
  {
    rules: {
      ...tseslint.configs.recommended[0].rules,
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
