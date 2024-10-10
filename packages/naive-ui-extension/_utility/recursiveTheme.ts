import type { Theme } from '@unocss/preset-mini'

export const kebabCase = (str: string): string => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/**
 *
 * @function
 * @param curTheme
 * @param prefix
 * @param preKeys
 * \{ "--black": "#000" \}
 */
export function recursiveTheme(curTheme: Record<string, any>, prefix?: string, preKeys: string[] = []): Record<string, string> {
  let theme: Record<string, string> = {}

  const getThemeKeys = (key: string): string[] => preKeys.concat(kebabCase(key)).filter(str => !/DEFAULT/i.test(str))

  Object.keys(curTheme).forEach((key) => {
    const val = Reflect.get(curTheme, key)

    if (Array.isArray(val)) {
      val.forEach((_, index) => {
        const name = `--${prefix}${[...getThemeKeys(key), index].join('-')}`
        theme[name] = val[index]
      })
    }
    else if (typeof val === 'string') {
      const name = `--${prefix}${[...getThemeKeys(key)].join('-')}`
      theme[name] = val
    }
    else {
      theme = { ...theme, ...recursiveTheme(val, prefix, getThemeKeys(key)) }
    }
  })
  return theme
}
