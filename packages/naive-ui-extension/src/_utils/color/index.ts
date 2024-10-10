import { colord } from '@pnpm-monorepo/color'

export function createHoverColor(rgb: string): string {
  return colord(rgb).mix('#fff').alpha(0.16).toHex()
}

export function createPressedColor(rgb: string): string {
  return colord(rgb).mix('#000').alpha(0.12).toHex()
}
