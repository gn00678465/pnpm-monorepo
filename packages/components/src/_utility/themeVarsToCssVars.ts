import { camelToKebab } from '@pnpm-monorepo/utility'

function parseSpacingValue(value: string): Record<string, string> {
  const parts = value.split(' ').map(part => part.trim())
  const [top = '0', right = top, bottom = top, left = right] = parts

  if (parts.length > 4) {
    throw new Error(`Invalid spacing value: ${value}`)
  }

  return { top, bottom, left }
}

/**
 * 將 themeVars 轉為 css 變數
 * @param size 需要的 size
 * @param sizes 所有的 size Array
 * @param themeVars
 */
export function themeVarsToCssVars<T extends object, Size extends string>(
  size: Size,
  sizes: Size[],
  themeVars: T,
  prefix?: string,
): Record<string, string | number> {
  const result: Record<string, string | number> = {}
  const sizeCapitalized = size.charAt(0).toUpperCase() + size.slice(1)

  for (const [key, value] of Object.entries(themeVars)) {
    if (key.endsWith(sizeCapitalized)) {
      const baseProp = key.slice(0, -size.length)
      const cssVarName = `--${prefix ? `${prefix}-` : ''}${camelToKebab(baseProp)}`
      if ((baseProp.startsWith('padding') || baseProp.startsWith('margin')) && typeof value === 'string') {
        const spacingValues = parseSpacingValue(value)
        for (const [side, sideValue] of Object.entries(spacingValues)) {
          result[`${cssVarName}-${side}`] = sideValue
        }
      }
      else {
        result[cssVarName] = value
      }
    }
    else if (!sizes.some(s => key.endsWith(s.charAt(0).toUpperCase() + s.slice(1)))) {
      // Common property (not ending with any size suffix)
      result[`--${prefix ? `${prefix}-` : ''}${camelToKebab(key)}`] = value
    }
  }

  return result
}
