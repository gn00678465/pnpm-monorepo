type ThemeColorKey = string
type ThemeColorValue = string | number
type ThemeColorHandlers = Partial<Record<ThemeColorKey | ThemeColorValue, {
  key?: string
  handler: (color: ThemeColorKey, nested?: ThemeColorValue) => string
}>>
interface ThemeColorOptions {
  handlers?: ThemeColorHandlers
}

function valueHandler(...args: [color: string]): string
function valueHandler(...args: [color: string, nested?: ThemeColorValue]): string
function valueHandler(...args: [color: string] | [color: string, nested?: ThemeColorValue]): string {
  const color: string = args[0]
  const nested = args[1]
  if (!!color && !!nested)
    return `var(--${color}-${nested})`
  return `var(--${color})`
}

// 條件類型來處理不同的返回類型
type ThemeColorResult<T extends ThemeColorKey> = Record<T, Record<string, string>> | Record<T, string>
// 函數重載簽名
export function createUnocssThemeColor<T extends ThemeColorKey, K extends ThemeColorValue>(
  colors: T[],
  shades: K[],
  options?: ThemeColorOptions
): Record<T, Record<string, string>>
export function createUnocssThemeColor<T extends ThemeColorKey>(
  colors: T[],
  options?: ThemeColorOptions
): Record<T, string>
export function createUnocssThemeColor<T extends ThemeColorKey>(
  colors: T[]
): Record<T, string>
/**
 * 產生 unocss 顏色的設定
 * @param args
 */
export function createUnocssThemeColor<T extends ThemeColorKey, K extends ThemeColorValue | undefined>(...args: any[]): ThemeColorResult<T> {
  const _colors: T[] = args[0]
  const _shades: K[] | undefined = Array.isArray(args[1]) ? args[1] : undefined
  const _options: ThemeColorOptions = typeof args[2] === 'object' ? args[2] : typeof args[1] === 'object' ? args[1] : {}

  const { handlers } = _options

  function _hasNested(shades: K[] | undefined): shades is K[] {
    return !!shades
  }

  function _isStringOrNumber(str: ThemeColorValue | undefined): str is ThemeColorValue {
    return (typeof str === 'string' || typeof str === 'number')
  }

  if (_colors && _hasNested(_shades)) {
    const colorPaletteVar = {} as Record<T, Record<string, string>>
    _colors.forEach((color) => {
      colorPaletteVar[color] = _shades.reduce((obj, nested) => {
        if (_isStringOrNumber(nested) && handlers && nested in handlers && !!handlers[nested]) {
          const { handler, key } = handlers[nested]
          obj[`${key || nested}`] = handler(color, nested)
        }
        else {
          obj[`${nested}`] = valueHandler(color, nested)
        }
        return obj
      }, {} as Record<string, string>)
    })
    return colorPaletteVar
  }
  else {
    const colorPaletteVar = {} as Record<T, string>
    _colors.forEach((color) => {
      if (handlers && color in handlers && !!handlers[color]) {
        const { handler } = handlers[color]
        colorPaletteVar[color] = handler(color)
      }
      else {
        colorPaletteVar[color] = valueHandler(color)
      }
    })
    return colorPaletteVar
  }
}
