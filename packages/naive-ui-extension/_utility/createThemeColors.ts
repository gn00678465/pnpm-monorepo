import type { Theme } from '@unocss/preset-mini'
import { kebabCase } from './recursiveTheme'

export function createThemeColors(curTheme: Record<string, any>, prefix?: string, preKeys: string[] = []): Theme['colors'] {
  const colors: NonNullable<Theme['colors']> = {}

  Object.keys(curTheme).forEach((key) => {
    const val = Reflect.get(curTheme, key)
    const themeKeys = preKeys.concat(kebabCase(key)).filter(str => !/DEFAULT/i.test(str))

    if (Array.isArray(val)) {
      val.forEach((_, index) => {
        const cssVar = `--${prefix}${[...themeKeys, index].join('-')}`
        colors[key] = cssVar
      })
    }
    else if (typeof val === 'string') {
      const cssVar = `--${prefix}${[...themeKeys].join('-')}`
      colors[key] = cssVar
    }
    else {
      colors[key] = createThemeColors(val, prefix, themeKeys) as any
    }
  })

  return colors
}
