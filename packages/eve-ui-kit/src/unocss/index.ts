import type { Postprocessor, Preset } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { entriesToCss, mergeDeep, toArray } from '@unocss/core'
import { kebabCase, recursiveTheme } from '../_utility'
import { colorPaletteKeys, colorPaletteNumbers, darkColors, darkDropShadow, lightColors, lightDropShadow, size, theme } from '../core/theme'

interface Selectors {
  light?: string
  dark?: string
}

export interface PresetEveUIKitOptions {
  /**
   * Customize the selectors of the generated css variables
   * @default { light: ':root', dark: 'dark' }
   */
  selectors?: Selectors
  /**
   * Utils prefix. When using tagged pseudo selector, only the first truthy prefix will be used.
   *
   * @default undefined
   */
  prefix?: string | string[]
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   */
  variablePrefix?: string
  // pure class, if you used unocss with other ui components, you can use their css variables
  pureCssVariables?: Theme['colors']
}

export function presetEveUIKit(options: PresetEveUIKitOptions = {}): Preset<Theme> {
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.selectors = options.selectors || {}
  const selectors: Selectors = { light: ':root', dark: 'dark' }

  options.pureCssVariables = options.pureCssVariables || {}

  return {
    name: 'unocss-preset-eve-ui-kit',
    prefix: options.prefix,
    layers: {
      theme: 0,
      default: 1,
    },
    theme: { ...theme, colors: { ...options.pureCssVariables } },
    options,
    extendTheme(originTheme) {
      const theme = colorPaletteKeys.reduce((obj, key) => {
        obj[key] = colorPaletteNumbers.reduce((_obj, number) => {
          _obj[`${number}`] = `var(--${options.variablePrefix}${key}-${number})`
          _obj.DEFAULT = `var(--${options.variablePrefix}${key}-600)`
          return _obj
        }, {} as Record<string, string>)
        return obj
      }, {} as Record<string, Record<string, string>>)

      const css = ['dropShadow'].reduce((obj, key) => {
        const kebabCaseKey = kebabCase(key)
        obj[key] = size.reduce((_obj, s) => {
          _obj[s] = `var(--${options.variablePrefix}${kebabCaseKey}-${s})`
          _obj.DEFAULT = `var(--${options.variablePrefix}${kebabCaseKey}-md)`
          return _obj
        }, {} as Record<string, string>)
        return obj
      }, {} as Record<string, Record<string, string>>)

      return mergeDeep(originTheme, { colors: theme, ...css })
    },
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    preflights: [
      {
        layer: 'theme',
        async getCSS() {
          const returnCss: string[] = []

          // light theme
          const lightCss = entriesToCss(Object.entries(recursiveTheme({ ...lightColors, dropShadow: lightDropShadow }, options.variablePrefix)))
          const lightRoots = toArray([selectors.light, `::backdrop`])
          returnCss.push(lightRoots.map(root => `${root}{${lightCss}}`).join(''))
          // dark theme
          const darkCss = entriesToCss(Object.entries(recursiveTheme({ ...darkColors, dropShadow: darkDropShadow }, options.variablePrefix)))
          const darkRoots = toArray([`:root.${selectors.dark}`, '@media (prefers-color-scheme: dark)', `:root.${selectors.dark}::backdrop`])
          returnCss.push(darkRoots.map(root => `${root}{${darkCss}}`).join(''))

          return returnCss.join('')
        },
      },
    ],
  }
}

export function VarPrefixPostprocessor(prefix: string): Postprocessor | undefined {
  if (prefix !== 'un-') {
    return (obj) => {
      obj.entries.forEach((i) => {
        i[0] = i[0].replace(/^--un-/, `--${prefix}`)
        if (typeof i[1] === 'string')
          i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
      })
    }
  }
}
