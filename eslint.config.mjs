import antfu from '@antfu/eslint-config'
import eslintConfigBase from './eslint.config.base.mjs'

const baseConfig = antfu({
  typescript: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      projectService: {
        allowDefaultProject: ['vite.config.ts'],
      },
    },
  },
  ignores: [
    '**/vitest.config.ts',
    '**/vitest.workspace.ts',
    '**/commitlint.config.ts',
  ],
}, ...eslintConfigBase)

export default baseConfig
