import type { AntdColorPaletteNumber } from '../types'

/**
 * 產生 unocss 顏色的設定
 * @param colors
 * @param defaultNumber
 */
export function createAntdColorPaletteUnocssThemeVars<T extends string = string>(
  colors: T[],
  defaultNumber: AntdColorPaletteNumber | null = null,
): Record<T, Record<string, string>> {
  const colorPaletteNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const colorPaletteVar = {} as Record<T, Record<string, string>>

  colors.forEach((color) => {
    colorPaletteVar[color] = colorPaletteNumbers.reduce((obj, number) => {
      if (defaultNumber && colorPaletteNumbers.includes(defaultNumber)) {
        obj.DEFAULT = `var(--${color}-${defaultNumber})`
      }
      obj[`${number}`] = `var(--${color}-${number})`
      return obj
    }, {} as Record<string, string>)
  })

  return colorPaletteVar
}
