import type { Theme } from '@unocss/preset-mini'
import { definePreset, type Postprocessor } from '@unocss/core'
import { entriesToCss, mergeDeep, toArray } from '@unocss/core'
import { darkBase, lightBase } from '../_styles'
import { createThemeColors, recursiveTheme } from '../_utility'

interface Selectors {
  light?: string
  dark?: string
}

export interface PresetNaiveThemeOptions {
  theme?: {
    lightTheme: Theme['colors']
    darkTheme: Theme['colors']
  }
  /**
   * Customize the selectors of the generated css variables
   * @default { light: ':root', dark: 'dark' }
   */
  selectors?: Selectors
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   */
  variablePrefix?: string
  /**
   * Utils prefix. When using tagged pseudo selector, only the first truthy prefix will be used.
   *
   * @default undefined
   */
  prefix?: string | string[]
  enforce?: 'pre' | 'post'
  // pure class, if you used unocss with other ui components, you can use their css variables
  pureCssVariables?: Theme['colors']
}

export const presetNaiveTheme = definePreset((options: PresetNaiveThemeOptions = {}) => {
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.selectors = options.selectors || {}
  const selectors: Selectors = { light: ':root', dark: 'dark' }

  options.theme = options.theme || { darkTheme: darkBase, lightTheme: lightBase }
  const lightTheme = options.theme.lightTheme || lightBase
  const darkTheme = options.theme.darkTheme ? options.theme.darkTheme : options.theme.lightTheme ? options.theme.lightTheme : darkBase

  options.pureCssVariables = options.pureCssVariables || createThemeColors(lightTheme, options.variablePrefix)

  return {
    name: 'unocss-preset-naive-ui-theme',
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    prefix: options.prefix,
    layers: {
      theme: 0,
      default: 1,
    },
    enforce: options.enforce,
    extendTheme(originTheme) {
      return mergeDeep(originTheme, { colors: { ...options.pureCssVariables } })
    },
    preflights: [
      {
        layer: 'theme',
        async getCSS() {
          const returnCss: string[] = []

          // light theme
          const lightCss = entriesToCss(Object.entries(recursiveTheme({ ...lightTheme }, options.variablePrefix)))
          const lightRoots = toArray([selectors.light, `::backdrop`])
          returnCss.push(lightRoots.map(root => `${root}{${lightCss}}`).join(''))
          // dark theme
          const darkCss = entriesToCss(Object.entries(recursiveTheme({ ...darkTheme }, options.variablePrefix)))
          const darkRoots = toArray([`:root.${selectors.dark}`, '@media (prefers-color-scheme: dark)', `:root.${selectors.dark}::backdrop`])
          returnCss.push(darkRoots.map(root => `${root}{${darkCss}}`).join(''))

          return returnCss.join('')
        },
      },
    ],
  }
})

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
