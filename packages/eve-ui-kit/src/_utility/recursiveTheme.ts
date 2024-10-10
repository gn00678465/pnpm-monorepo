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

  Object.keys(curTheme).forEach((key) => {
    const val = Reflect.get(curTheme, key)
    const themeKeys = preKeys.concat(kebabCase(key)).filter(str => !/DEFAULT/i.test(str))

    if (Array.isArray(val)) {
      val.forEach((_, index) => {
        const name = `--${prefix}${[...themeKeys, index].join('-')}`
        theme[name] = val[index]
      })
    }
    else if (typeof val === 'string') {
      const name = `--${prefix}${[...themeKeys].join('-')}`
      theme[name] = val
    }
    else {
      theme = { ...theme, ...recursiveTheme(val, prefix, themeKeys) }
    }
  })
  return theme
}
