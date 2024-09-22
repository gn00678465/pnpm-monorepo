// @unocss-include
import { definePreset } from 'unocss'

export type BlackThemeColorKeys =
  'charcoal-gray' |
  'dark-slate-gray' |
  'outer-space' |
  'rich-black' |
  'coffee-bean' |
  'dark-gray' |
  'oil-black' |
  'obsidian' |
  'ebony' |
  'black-chocolate' |
  'gunmetal' |
  'smoky-black' |
  'oxford-blue' |
  'eerie-black' |
  'jet-black' |
  'iridium' |
  'arsenic' |
  'charleston-green' |
  'jet' |
  'black-olive' |
  'midnight-blue'

export const blackThemeColorPreset = definePreset(() => {
  return {
    name: 'unocss-black-theme-color-preset',
    theme: {
      colors: {
        'charcoal-gray': '#121212',
        'dark-slate-gray': '#191919',
        'outer-space': '#252525',
        'rich-black': '#0A0A0A',
        'coffee-bean': '#1B1B1B',
        'dark-gray': '#212427',
        'oil-black': '#0C0C0C',
        'obsidian': '#0B1215',
        'ebony': '#222428',
        'black-chocolate': '#100D08',
        'gunmetal': '#1D1F21',
        'smoky-black': '#101720',
        'oxford-blue': '#212A37',
        'eerie-black': '#232023',
        'jet-black': '#161618',
        'iridium': '#181818',
        'arsenic': '#111B1C',
        'charleston-green': '#212124',
        'jet': '#2A2A2A',
        'black-olive': '#242526',
        'midnight-blue': '#212121',
      },
    },
  }
})
