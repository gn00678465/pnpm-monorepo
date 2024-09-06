/** Create color palette vars */
function createColorPaletteVars() {
  const colors = ['primary', 'info', 'success', 'warning', 'error'];
  const colorPaletteNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const colorPaletteVar = {} as Record<string, Record<string, string>>;

  colors.forEach((color) => {
    colorPaletteVar[color] = colorPaletteNumbers.reduce((obj, number) => {
      if (number === 6) {
        obj['DEFAULT'] = `var(--${color}-${number})`
      }
      obj[`${number}`] = `var(--${color}-${number})`
      return obj
    }, {} as Record<string, string>)
  });

  return colorPaletteVar;
}

const colorPaletteVars = createColorPaletteVars();

/** Theme vars */
export const themeVars: { colors: Record<string, string>, boxShadow: Record<string, string> } = {
  colors: {
    ...colorPaletteVars,
    nprogress: 'rgb(var(--nprogress-color))',
    container: 'rgb(var(--container-bg-color))',
    layout: 'rgb(var(--layout-bg-color))',
    inverted: 'rgb(var(--inverted-bg-color))',
    'base-text': 'rgb(var(--base-text-color))'
  },
  boxShadow: {
    header: 'var(--header-box-shadow)',
    sider: 'var(--sider-box-shadow)',
    tab: 'var(--tab-box-shadow)'
  }
};