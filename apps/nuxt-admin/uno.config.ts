import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import { monorepoPreset, blackThemeColorPreset, iconAnimationPreset } from '@pnpm-monorepo/uno-preset'
import { themeVars } from './theme/vars';

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Noto Sans TC', 'Roboto'],
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
    monorepoPreset({
      theme: {
        ...themeVars,
      }
    }),
    blackThemeColorPreset(),
    iconAnimationPreset()
  ],
})
