import type { GlobalThemeOverrides } from 'naive-ui'
import { getAntdPaletteColorByNumber } from '@pnpm-monorepo/color'
import type { NaiveColorAction, NaiveColorKey, NaiveThemeColor, NaiveThemeColorKey } from '../types'

export interface CreateNaiveThemeColorsOptions {
  darkMode?: boolean
  backgroundColor?: string
}

/**
 * 產生 naive 用顏色
 * @param colors
 * @param {CreateNaiveThemeColorsOptions} options
 * @param {boolean} [options.darkMode]
 * @param {string} [options.backgroundColor]
 */
export function createNaiveThemeColors(
  colors: NaiveThemeColor,
  options: CreateNaiveThemeColorsOptions = {},
): GlobalThemeOverrides['common'] {
  const opt = { theme: options.darkMode ? 'dark' : 'default', backgroundColor: options?.backgroundColor } as const

  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => getAntdPaletteColorByNumber(color, 5, opt) || color },
    { scene: 'Suppl', handler: color => getAntdPaletteColorByNumber(color, 4, opt) || color },
    { scene: 'Hover', handler: color => getAntdPaletteColorByNumber(color, 4, opt) || color },
    { scene: 'Pressed', handler: color => getAntdPaletteColorByNumber(color, 6, opt) || color },
  ]

  const themeColors: GlobalThemeOverrides['common'] = {}

  const colorEntries = Object.entries(colors) as [NaiveThemeColorKey, string][]

  colorEntries.forEach(([colorType, colorValue]) => {
    colorActions.forEach((action) => {
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    })
  })

  return themeColors
}
