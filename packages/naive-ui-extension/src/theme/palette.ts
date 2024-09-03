import type { GlobalThemeOverrides } from 'naive-ui'
import { getAntdPaletteColorByNumber } from '@pnpm-monorepo/color'
import type { NaiveColorAction, NaiveColorKey, NaiveThemeColor, NaiveThemeColorKey } from '../types'

/**
 * 產生 naive 用顏色
 * @param colors
 * @param darkMode
 */
export function createNaiveThemeColors(
  colors: NaiveThemeColor,
  darkMode: boolean = false,
): GlobalThemeOverrides['common'] {
  const options = darkMode ? { theme: 'dark' } as const : undefined

  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => getAntdPaletteColorByNumber(color, 5, options) || color },
    { scene: 'Suppl', handler: color => getAntdPaletteColorByNumber(color, 4, options) || color },
    { scene: 'Hover', handler: color => getAntdPaletteColorByNumber(color, 4, options) || color },
    { scene: 'Pressed', handler: color => getAntdPaletteColorByNumber(color, 6, options) || color },
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
