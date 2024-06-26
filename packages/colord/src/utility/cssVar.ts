type CssVarObject = {
  [key: string]: string;
};

/**
 * 將 CSS 字串解析為 Object
 *
 * @param {string} cssText "--primary-color1: 211,224,215;--primary-color2: 167,212,182;"
 * @return {CssVarObject} { --primary-color1: '211,224,215', --primary-color2: '167,212,182' }
 */

export function parseCssVar(cssText: string): CssVarObject {
  const cssObj: CssVarObject = {};

  cssText.split(';').forEach((rule) => {
    if (rule) {
      const [key, value] = rule.split(':');
      cssObj[key.trim()] = value.trim();
    }
  });
  return cssObj;
}
