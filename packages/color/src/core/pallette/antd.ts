import type { AnyColor } from 'colord'
import type { AntdColorPaletteNumber, AntdGenerateOptions } from '../../types'
import { generate } from '@ant-design/colors'
import { getHex, transformHexToRgbString } from '../helper/colord'

type Format = 'hex' | 'rgbString'

/**
 * Ant design color
 */
const colorPaletteNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

interface Opts extends AntdGenerateOptions {
  format?: Format
}

interface CreateNestedColorPaletteVarsOptions extends Opts {
  type?: 'nested'
}

interface CreateFlatColorPaletteVarsOptions extends Opts {
  type?: 'flat'
}

/**
 * 轉換顏色格式
 * hex: #000000
 * rgbString: rgb(0,0,0)
 * @param format
 * @param color
 */
function transformFormat(format: Format, color: string): string {
  if (format === 'rgbString')
    return transformHexToRgbString(color)
  return color
}

/**
 * Create nested color palette vars
 * @param colors
 * @param {object} options
 * @param {'dark' | 'default'} [options.theme] - The theme option, either 'dark' or 'default'.
 * @param {string} [options.backgroundColor] - The background color as a string.
 */
function createAntdNestedColorPaletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>,
  options: Opts = {},
): Record<ColorKey, Record<string, string>> {
  const { format = 'hex' } = options

  const keys = Object.keys(colors) as ColorKey[]
  const colorPaletteVar = {} as Record<ColorKey, Record<string, string>>

  for (const key of keys) {
    const antColors = generate(getHex(colors[key]), options)
    const palette = antColors.reduce((obj, color, index) => {
      obj[`${colorPaletteNumbers[index]}`] = transformFormat(format, color)
      return obj
    }, {} as Record<string, string>)
    colorPaletteVar[key] = palette
  }

  return colorPaletteVar
}

/**
 * Create flat color palette vars
 * @param colors
 * @param {object} options
 * @param {'dark' | 'default'} [options.theme] - The theme option, either 'dark' or 'default'.
 * @param {string} [options.backgroundColor] - The background color as a string.
 */
function createAntdFlatColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>,
  options: Opts = {},
): Record<string, string> {
  const { format = 'hex' } = options

  const keys = Object.keys(colors) as ColorKey[]
  const colorPaletteVar = {} as Record<string, string>

  for (const key of keys) {
    const antColors = generate(getHex(colors[key]), options)
    antColors.forEach((color, index) => {
      colorPaletteVar[`${key}-${colorPaletteNumbers[index]}`] = transformFormat(format, color)
    })
  }

  return colorPaletteVar
}

/**
 * Create Antd color palette vars
 * @param colors
 * @param options
 * @param {'flat' | 'nested'} [options.type] - The theme option, either 'flat' or 'nested'.
 * @param {'dark' | 'default'} [options.theme] - The theme option, either 'dark' or 'default'.
 * @param {string} [options.backgroundColor] - The background color as a string.
 */
export function createAntdColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>, options?: CreateFlatColorPaletteVarsOptions
): Record<string, string>
export function createAntdColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>, options: CreateNestedColorPaletteVarsOptions
): Record<ColorKey, Record<string, string>>
export function createAntdColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>,
  options: CreateNestedColorPaletteVarsOptions | CreateFlatColorPaletteVarsOptions = {},
): Record<ColorKey, Record<string, string>> | Record<string, string> {
  const { type = 'flat', format = 'hex' } = options
  if (type === 'flat') {
    return createAntdFlatColorPalletteVars<ColorKey>(
      colors,
      { theme: options.theme, backgroundColor: options.backgroundColor, format },
    )
  }
  if (type === 'nested') {
    return createAntdNestedColorPaletteVars<ColorKey>(
      colors,
      { theme: options.theme, backgroundColor: options.backgroundColor, format },
    )
  }
  throw new Error(`Type must be 'flat' of 'nested'`)
}

/**
 * get Antd color palette by provided color
 * @param color
 * @param options
 */
export function getAntdPaletteColor(
  color: AnyColor,
  options: Opts = {},
): Map<AntdColorPaletteNumber, string> {
  const colorMap = new Map<AntdColorPaletteNumber, string>()
  const colors = generate(getHex(color), options)

  colors.forEach((c, index) => {
    colorMap.set(colorPaletteNumbers[index], c)
  })

  return colorMap
}

/**
 * get Antd color palette color by number
 * @param color
 * @param number
 * @param options
 */
export function getAntdPaletteColorByNumber(
  color: AnyColor,
  number: AntdColorPaletteNumber,
  options: Opts = {},
): string | undefined {
  const colorMap = getAntdPaletteColor(color, options)
  return colorMap.get(number)
}
