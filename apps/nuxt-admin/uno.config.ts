import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import { monorepoPreset, blackThemeColorPreset, iconAnimationPreset } from '@pnpm-monorepo/uno-preset'
import { themeVars } from './theme/vars'

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
  preflights: [
    {
      getCSS: ({ theme }) => {
        const darkRoot = `
          --color: ${theme.colors.white};
          --bg-color-1: ${theme.colors['charcoal-gray']};
          --bg-color-2: color-mix(in srgb, ${theme.colors['charcoal-gray']}, #ffffff 20%);
          --bg-color-3: color-mix(in srgb, ${theme.colors['charcoal-gray']}, #ffffff 40%);
          --bg-color-4: color-mix(in srgb, ${theme.colors['charcoal-gray']}, #ffffff 60%);
          --bg-color-5: color-mix(in srgb, ${theme.colors['charcoal-gray']}, #ffffff 80%);
          --body-bg: ${theme.colors['charcoal-gray']};
          --color-text-1: rgba(255, 255, 255, 0.9);
          --color-text-2: rgba(255, 255, 255, 0.7);
          --color-text-3: rgba(255, 255, 255, 0.5);
          --color-text-4: rgba(255, 255, 255, 0.3);
        `

        return `
          :root {
            color-scheme: light dark;
            --color: ${theme.colors['charcoal-gray']};
            --bg-color-1: ${theme.colors.white};
            --bg-color-2: ${theme.colors.white};
            --bg-color-3: ${theme.colors.white};
            --bg-color-4: ${theme.colors.white};
            --bg-color-5: ${theme.colors.white};
            --body-bg: #f5f7fb;
            --color-text-1: #1d2129;
            --color-text-2: #4e5969;
            --color-text-3: #86909c;
            --color-text-4: #c9cdd4;
            background-color: var(--bg-color);
            color: var(--color);
          }

          :root.dark {
            ${darkRoot}
          }

          @media (prefers-color-scheme: dark) {
            ${darkRoot}
          }
        `
      }
    },
  ]
})
