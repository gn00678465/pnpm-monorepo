interface GetCssVarsOptions {
  keyHandler?: (...color: string[]) => string
  colorHandler?: (color: string) => string
}

function getCssVars(
  theme: Record<string, Record<string, string>>,
  { keyHandler, colorHandler }: GetCssVarsOptions = {},
): string {
  keyHandler = (...keys: string[]) => {
    return `--${keys.join('-')}`
  }
  colorHandler = v => v

  const styles: string[] = []

  for (const key in theme) {
    if (typeof theme[key] === 'object') {
      for (const num in theme[key]) {
        styles.push(`${keyHandler(key, num)}: ${colorHandler(theme[key][num])}`)
      }
    }
  }

  return styles.join(';')
}

/**
 *
 * @param theme
 */
export function addCssVarsToGlobal(theme: Record<string, Record<string, string>>): void {
  const cssVarStr = getCssVars(theme)
  const css = `
    :root {
      ${cssVarStr}
    }
  `

  const styleId = 'theme-vars'

  const style = document.querySelector(`#${styleId}`) || document.createElement('style')

  style.id = styleId

  style.textContent = css

  document.head.appendChild(style)
}
