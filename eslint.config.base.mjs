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
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'n/prefer-global/buffer': ['error', 'always'],
      'n/prefer-global/console': ['error', 'always'],
      'n/prefer-global/process': ['error', 'always'],
      'n/prefer-global/url-search-params': ['error', 'always'],
      'n/prefer-global/url': ['error', 'always'],
    },
  },
]
