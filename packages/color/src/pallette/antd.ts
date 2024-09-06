import { generate } from '@ant-design/colors'
import type { AnyColor } from 'colord'
import { getHex } from '../helper/colord'

/**
 * Ant design color
 */
const colorPaletteNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

type ColorPaletteNumber = (typeof colorPaletteNumbers)[number]

interface Opts {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}

interface CreateNestedColorPaletteVarsOptions extends Opts {
  type?: 'nested'
}

interface CreateFlatColorPaletteVarsOptions extends Opts {
  type?: 'flat'
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
  const keys = Object.keys(colors) as ColorKey[]

  const colorPaletteVar = {} as Record<ColorKey, Record<string, string>>

  for (const key of keys) {
    const antColors = generate(getHex(colors[key]), options)
    const palette = antColors.reduce((obj, color, index) => {
      obj[`${colorPaletteNumbers[index]}`] = color
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
  const keys = Object.keys(colors) as ColorKey[]

  const colorPaletteVar = {} as Record<string, string>

  for (const key of keys) {
    const antColors = generate(getHex(colors[key]), options)
    antColors.forEach((color, index) => {
      colorPaletteVar[`${key}-${colorPaletteNumbers[index]}`] = color
    })
  }

  return colorPaletteVar
}

export function createAntdColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>, options?: CreateFlatColorPaletteVarsOptions
): Record<string, string>
export function createAntdColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>, options: CreateNestedColorPaletteVarsOptions
): Record<ColorKey, Record<string, string>>
/**
 * Create Antd color palette vars
 * @param colors
 * @param options
 * @param {'flat' | 'nested'} [options.type] - The theme option, either 'flat' or 'nested'.
 * @param {'dark' | 'default'} [options.theme] - The theme option, either 'dark' or 'default'.
 * @param {string} [options.backgroundColor] - The background color as a string.
 */
export function createAntdColorPalletteVars<ColorKey extends string = string>(
  colors: Record<ColorKey, AnyColor>,
  options: CreateNestedColorPaletteVarsOptions | CreateFlatColorPaletteVarsOptions = {},
): Record<ColorKey, Record<string, string>> | Record<string, string> {
  const { type = 'flat' } = options
  if (type === 'flat') {
    return createAntdFlatColorPalletteVars<ColorKey>(
      colors,
      { theme: options.theme, backgroundColor: options.backgroundColor },
    )
  }
  if (type === 'nested') {
    return createAntdNestedColorPaletteVars<ColorKey>(
      colors,
      { theme: options.theme, backgroundColor: options.backgroundColor },
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
): Map<ColorPaletteNumber, string> {
  const colorMap = new Map<ColorPaletteNumber, string>()
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
  number: ColorPaletteNumber,
  options: Opts = {},
): string | undefined {
  const colorMap = getAntdPaletteColor(color, options)
  return colorMap.get(number)
}
