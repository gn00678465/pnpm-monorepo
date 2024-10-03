import type { GlobalThemeOverrides } from 'naive-ui'
import type { NaiveColorKey, NaiveThemeColor, NaiveThemeColorKey, NaiveThemeColorScene } from '../types'
import { getAntdPaletteColorByNumber } from '@pnpm-monorepo/color'

export interface CreateNaiveThemeColorsOptions {
  darkMode?: boolean
  backgroundColor?: string
}

export interface NaiveColorAction {
  scene: '' | Capitalize<NaiveThemeColorScene>
  handler: (color: string, opt?: CreateNaiveThemeColorsOptions) => string
}

export interface CreateNaiveThemeColorsHandlers {
  ''?: (color: string, opt?: CreateNaiveThemeColorsOptions) => string
  'suppl'?: (color: string, opt?: CreateNaiveThemeColorsOptions) => string
  'hover'?: (color: string, opt?: CreateNaiveThemeColorsOptions) => string
  'pressed'?: (color: string, opt?: CreateNaiveThemeColorsOptions) => string
}

/**
 * 產生 naive 用顏色
 * @param colors
 * @param {CreateNaiveThemeColorsOptions} options
 * @param {boolean} [options.darkMode]
 * @param {string} [options.backgroundColor]
 * @param {CreateNaiveThemeColorsHandlers} handlers
 */
export function createNaiveThemeColors(
  colors: NaiveThemeColor,
  options: CreateNaiveThemeColorsOptions = {},
  handlers: CreateNaiveThemeColorsHandlers = {},
): GlobalThemeOverrides['common'] {
  const opt = { theme: options?.darkMode ? 'dark' : 'default', backgroundColor: options?.backgroundColor } as const

  const {
    suppl = color => getAntdPaletteColorByNumber(color, 6, opt) || color,
    hover = color => getAntdPaletteColorByNumber(color, 5, opt) || color,
    pressed = color => getAntdPaletteColorByNumber(color, 7, opt) || color,
  } = handlers

  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: handlers[''] || (color => getAntdPaletteColorByNumber(color, 6, opt) || color) },
    { scene: 'Suppl', handler: suppl },
    { scene: 'Hover', handler: hover },
    { scene: 'Pressed', handler: pressed },
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
