import antfu from '@antfu/eslint-config'
import eslintConfigBase from '../../eslint.config.base.mjs'

export default antfu(
  {
    type: 'lib',
    typescript: true,
    jsonc: false,
    yaml: false,
    stylistic: {
    },
  },
  ...eslintConfigBase,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/first-attribute-linebreak': ['off', {
        singleline: 'ignore',
        multiline: 'below',
      }],
    },
  },
)
