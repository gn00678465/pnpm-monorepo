import type { Theme } from '@unocss/preset-mini'

export const lightDropShadow = {
  DEFAULT: '0px 10px 20px 0px rgba(148, 163, 184, 0.15);',
  none: '0 0 rgb(0 0 0 / 0)',
  xs: '0px 3px 6px 0px rgba(148, 163, 184, 0.15);',
  sm: '0px 6px 12px 0px rgba(148, 163, 184, 0.15);',
  md: '0px 10px 20px 0px rgba(148, 163, 184, 0.15);',
  lg: '0px 16px 32px 0px rgba(148, 163, 184, 0.15);',
  xl: '0px 24px 56px 0px rgba(148, 163, 184, 0.15);',
} satisfies Theme['dropShadow']

export const darkDropShadow = {
  DEFAULT: '0px 10px 20px 0px #070A13;',
  none: '0 0 rgb(0 0 0 / 0)',
  xs: '0px 3px 6px 0px #070A13;',
  sm: '0px 6px 12px 0px #070A13;',
  md: '0px 10px 20px 0px #070A13;',
  lg: '0px 16px 32px 0px #070A13;',
  xl: '0px 24px 56px 0px #070A13;',
} satisfies Theme['dropShadow']
