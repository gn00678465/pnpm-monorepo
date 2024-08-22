import antfu from '@antfu/eslint-config'
import eslintConfigBase from './eslint.config.base.mjs'

const baseConfig = antfu({
  typescript: {
    tsconfigPath: './tsconfig.base.json',
  },
}, ...eslintConfigBase)

export default baseConfig
