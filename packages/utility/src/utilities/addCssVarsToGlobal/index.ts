interface GetCssVarsOptions {
  styleId?: string
  keyHandler?: (...color: string[]) => string
  valueHandler?: (color: string) => string
}

type ThemeFlatRecord = Record<string, string>
type ThemeNestedRecord = Record<string, Record<string, string>>

type ThemeRecord = ThemeFlatRecord | ThemeNestedRecord

function isFlat(theme: ThemeRecord, key: keyof ThemeRecord): theme is ThemeFlatRecord {
  return !!(theme[key] && typeof theme[key] === 'string')
}

function isNested(theme: ThemeRecord, key: keyof ThemeRecord): theme is ThemeNestedRecord {
  return !!(theme[key] && typeof theme[key] === 'object')
}

function getCssVars(
  theme: ThemeRecord,
  { keyHandler, valueHandler }: Omit<GetCssVarsOptions, 'styleId'> = {},
): string {
  keyHandler = (...keys: string[]) => {
    return `--${keys.join('-')}`
  }
  valueHandler = v => v

  const styles: string[] = []

  for (const key in theme) {
    if (isNested(theme, key)) {
      for (const num in theme[key]) {
        styles.push(`${keyHandler(key, num)}: ${valueHandler(theme[key][num])}`)
      }
    }
    if (isFlat(theme, key)) {
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
export function addCssVarsToGlobal(
  theme: ThemeRecord,
  options?: GetCssVarsOptions,
): void
export function addCssVarsToGlobal(
  theme: ThemeRecord[],
  options?: GetCssVarsOptions,
): void
export function addCssVarsToGlobal(
  theme: ThemeRecord | ThemeRecord[],
  options: GetCssVarsOptions = {},
): void {
  const { styleId = 'theme-vars', ...ops } = options

  let cssVarStr: string | undefined

  if (Array.isArray(theme)) {
    cssVarStr = theme.map(t => getCssVars(t, ops)).join(';')
  }
  if (typeof theme === 'object' && !Array.isArray(theme)) {
    cssVarStr = getCssVars(theme, ops)
  }

  if (cssVarStr) {
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
}
