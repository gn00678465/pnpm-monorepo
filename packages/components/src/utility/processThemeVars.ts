import { camelToKebab } from '@pnpm-monorepo/utility'

/**
 * 將 themeVars 轉為 css 變數
 * @param size 需要的 size
 * @param sizes 所有的 size Array
 * @param themeVars
 */
export function processThemeVars<T extends object, Size extends string>(
  size: Size,
  sizes: Size[],
  themeVars: T,
): Record<string, string | number> {
  const result: Record<string, string | number> = {}
  const sizeCapitalized = size.charAt(0).toUpperCase() + size.slice(1)

  for (const [key, value] of Object.entries(themeVars)) {
    if (key.endsWith(sizeCapitalized)) {
      // Size-specific property
      const baseProp = key.slice(0, -size.length)
      result[`--${camelToKebab(baseProp)}`] = value
    }
    else if (!sizes.some(s => key.endsWith(s.charAt(0).toUpperCase() + s.slice(1)))) {
      // Common property (not ending with any size suffix)
      result[`--${camelToKebab(key)}`] = value
    }
  }

  return result
}
