import type { Theme } from '@unocss/preset-mini'

export const fontSize: Theme['fontSize'] = {
  'xs': ['12px', '1.5'],
  'sm': ['14px', '20px'],
  'base': ['16px', '1.5'],
  'lg': ['18px', '28px'],
  'xl': ['20px', '1.5'],
  '2xl': ['24px', '32px'],
  '3xl': ['30px', '38px'],
  '4xl': ['36px', '44px'],
  '5xl': ['48px', '1.25'],
  '6xl': ['60px', '1.2'],
  '7xl': ['72px', '1.25'],
} satisfies Theme['fontSize']
