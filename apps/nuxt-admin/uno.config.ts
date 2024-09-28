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
    presetUno({
      dark: 'class'
    }),
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
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px'
        },
      },
    }),
    blackThemeColorPreset(),
    iconAnimationPreset()
  ],
})
