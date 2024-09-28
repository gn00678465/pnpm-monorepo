import { createAntdColorPaletteUnocssThemeVars } from '@pnpm-monorepo/color/unocss'

const colors = ['primary', 'info', 'success', 'warning', 'error'];

// function createNaiveUIColorPaletteVars() {
//   const colors = ['primary', 'info', 'success', 'warning', 'error'];
//   const colorPaletteScene = ['', 'hover', 'suppl', 'pressed'];

//   const colorPaletteVar = {} as Record<string, Record<string, string>>;

//   colors.forEach((color) => {
//     colorPaletteVar[color] = colorPaletteScene.reduce((obj, scene) => {
//       if (scene === '') {
//         obj['DEFAULT'] = `var(--${color}-6)`
//       } else {
//         obj[`${scene}`] = `var(--${color}-${scene})`
//       }
//       return obj
//     }, {} as Record<string, string>)
//   });

//   return colorPaletteVar;
// }

/** Theme vars */
export const themeVars: { colors: Record<string, string>, boxShadow: Record<string, string> } = {
  colors: {
    ...createAntdColorPaletteUnocssThemeVars(colors, 6),
    // ...createNaiveUIColorPaletteVars(),
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