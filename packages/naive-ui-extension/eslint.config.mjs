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
)
