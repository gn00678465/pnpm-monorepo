import type { GlobalThemeOverrides } from 'naive-ui'
import { type ColorPaletteKeys, type ColorPaletteNumbers, darkColors, lightColors } from '../core'

export type NaiveThemeColorKey = 'primary' | 'info' | 'success' | 'warning' | 'error'
export type NaiveThemeColorScene = 'hover' | 'suppl' | 'pressed'

export type NaiveColorKey = `${NaiveThemeColorKey}Color${'' | Capitalize<NaiveThemeColorScene>}`

export interface NaiveColorAction {
  scene: '' | Capitalize<NaiveThemeColorScene>
  handler: (key: ColorPaletteKeys, number?: ColorPaletteNumbers) => string
}

export interface CreateNaiveThemeSceneHandlers {
  ''?: (key: ColorPaletteKeys, number?: ColorPaletteNumbers) => string
  'suppl'?: (key: ColorPaletteKeys, number?: ColorPaletteNumbers) => string
  'hover'?: (key: ColorPaletteKeys, number?: ColorPaletteNumbers) => string
  'pressed'?: (key: ColorPaletteKeys, number?: ColorPaletteNumbers) => string
}

export function createNaiveThemeColors(darkMode: boolean = false, handlers: CreateNaiveThemeSceneHandlers = {}): GlobalThemeOverrides['common'] {
  const theme = !darkMode ? lightColors : darkColors

  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: handlers[''] || ((key, num = 600) => theme[key][num]) },
    { scene: 'Suppl', handler: handlers.suppl || ((key, num = 600) => theme[key][num]) },
    { scene: 'Hover', handler: handlers.hover || ((key, num = 500) => theme[key][num]) },
    { scene: 'Pressed', handler: handlers.pressed || ((key, num = 700) => theme[key][num]) },
  ]
  const themeColors: GlobalThemeOverrides['common'] = {}

  const naiveColorKeys: [NaiveThemeColorKey, ColorPaletteKeys][] = [
    ['primary', 'primary'],
    ['info', 'blue'],
    ['success', 'success'],
    ['warning', 'warning'],
    ['error', 'error'],
  ]

  naiveColorKeys.forEach(([colorType, colorPaletteKey]) => {
    colorActions.forEach((action) => {
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorPaletteKey)
    })
  })

  return themeColors
}
