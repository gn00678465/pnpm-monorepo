import type { AnyColor, HslColor, HsvColor, RgbColor } from 'colord'
import { colord, extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import labPlugin from 'colord/plugins/lab'
import mixPlugin from 'colord/plugins/mix'
import namesPlugin from 'colord/plugins/names'

extend([namesPlugin, mixPlugin, labPlugin, a11yPlugin])

export function isValidColor(color: AnyColor): boolean {
  return colord(color).isValid()
}

export function getHex(color: AnyColor): string {
  return colord(color).toHex()
}

export function getRgb(color: AnyColor): RgbColor {
  return colord(color).toRgb()
}

export function getHsl(color: AnyColor): HslColor {
  return colord(color).toHsl()
}

export function getHsv(color: AnyColor): HsvColor {
  return colord(color).toHsv()
}

export function getDeltaE(color1: AnyColor, color2: AnyColor): number {
  return colord(color1).delta(color2)
}

export function transformHslToHex(color: HslColor): string {
  return colord(color).toHex()
}

export function transformHexToRgbString(color: AnyColor): string {
  return colord(color).toRgbString()
}

/**
 * Add color alpha
 *
 * @param color - Color
 * @param alpha - Alpha (0 - 1)
 */
export function addColorAlpha(color: AnyColor, alpha: number): string {
  return colord(color).alpha(alpha).toHex()
}

/**
 * Mix color
 *
 * @param firstColor - First color
 * @param secondColor - Second color
 * @param ratio - The ratio of the second color (0 - 1)
 */
export function mixColor(firstColor: AnyColor, secondColor: AnyColor, ratio: number): string {
  return colord(firstColor).mix(secondColor, ratio).toHex()
}

/**
 * Transform color with opacity to similar color without opacity
 *
 * @param color - Color
 * @param alpha - Alpha (0 - 1)
 * @param bgColor Background color (usually white or black)
 */
export function transformColorWithOpacity(color: AnyColor, alpha: number, bgColor = '#ffffff'): string {
  const originColor = addColorAlpha(color, alpha)
  const { r: oR, g: oG, b: oB } = colord(originColor).toRgb()

  const { r: bgR, g: bgG, b: bgB } = colord(bgColor).toRgb()

  function calRgb(or: number, bg: number, al: number): number {
    return bg + (or - bg) * al
  }

  const resultRgb: RgbColor = {
    r: calRgb(oR, bgR, alpha),
    g: calRgb(oG, bgG, alpha),
    b: calRgb(oB, bgB, alpha),
  }

  return colord(resultRgb).toHex()
}

/**
 * Is white color
 *
 * @param color - Color
 */
export function isWhiteColor(color: AnyColor): boolean {
  return colord(color).isEqual('#ffffff')
}

export function getLuminance(color: AnyColor): number {
  return colord(color).luminance()
}

export { colord }
