interface GetCssVarsOptions {
  styleId?: string
  keyHandler?: (...color: string[]) => string
  valueHandler?: (color: string) => string
}

function getCssVars<ThemeKey extends string = string>(
  theme: Record<ThemeKey, Record<string, string>>,
  { keyHandler, valueHandler }: Omit<GetCssVarsOptions, 'styleId'> = {},
): string {
  keyHandler = (...keys: string[]) => {
    return `--${keys.join('-')}`
  }
  valueHandler = v => v

  const styles: string[] = []

  for (const key in theme) {
    if (typeof theme[key] === 'object') {
      for (const num in theme[key]) {
        styles.push(`${keyHandler(key, num)}: ${valueHandler(theme[key][num])}`)
      }
    }
    if (typeof theme[key] === 'string') {
      styles.push(`${keyHandler(key)}: ${valueHandler(theme[key])}`)
    }
  }

  return styles.filter(Boolean).join(';')
}

/**
 * 將 css 變數綁訂到 document style 上
 * @param theme
 * @param options
 */
export function addCssVarsToGlobal<ThemeKey extends string = string>(
  theme: Record<ThemeKey, Record<string, string>>,
  options: GetCssVarsOptions = {},
): void {
  const { styleId = 'theme-vars', ...ops } = options

  const cssVarStr = getCssVars(theme, ops)
  const css = `
    :root {
      ${cssVarStr}
    }
  `

  const style = document.querySelector(`#${styleId}`) || document.createElement('style')

  style.id = styleId

  style.textContent = css

  document.head.appendChild(style)
}
